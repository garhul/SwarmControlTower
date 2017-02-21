const config  = require("./config/config");
const ipc = require('node-ipc');
const fs = require('fs');
const dgram = require('dgram');
const sv = dgram.createSocket('udp4');
const http = require('http');
const log = require('./app/utils/logger.js')(config);

// prepare devices store
const Store = require('./app/models/devices')(config);

//load some controllers
var devCtrl = require('./app/controllers/devices')(config, Store);

const EV_DEV_GET = 'devices.get';
const EV_DEV_ADD = 'devices.add';
const EV_DEV_REMOVE = 'devices.del';
const EV_DEV_DISCOVERED = 'devices.discovered';
const EV_DEV_UPDATED = 'devices.updated';

ipc.config = config.ipc;
ipc.serve(() => {
  //handle standard events
  ipc.server.on('socket.disconnected',
    function(socket, destroyedSocketId) {
      // console.info('Socket disconnected' + destroyedSocketId);
  });

  ipc.server.on('connect',() => {
    // console.info("New connection stablished");
  });

  ipc.server.on('err',(err) => {
    log.w("Communications error: " + err.message, "IPC");
  });

  //bind device methods

  // get devices
  ipc.server.on(EV_DEV_GET ,(data, socket) => {
    log.n('requested devices list');
    ipc.server.emit(socket, EV_DEV_GET ,{
      status:200,
      data: devCtrl.get(data.filter)
    });
  });

  //add a device
  ipc.server.on(EV_DEV_ADD ,(data, socket) => {
    var data = devCtrl.add(data);
    var rsp = {};
    rsp.data = data;
    rsp.status = (data === false)? 500: 200;

    ipc.server.emit(socket, EV_DEV_ADD ,rsp);
  });

  //remove a device
  ipc.server.on(EV_DEV_REMOVE ,(data, socket) => {
    ipc.server.emit(socket, EV_DEV_REMOVE ,devCtrl.remove(data.ids));
  });
});

//Handle announce requests
sv.on('message',(cid, rinfo) => {
  //this should be an id of new device awaking
  log.i(`New announce message from ${rinfo.address}, chip id: ${cid}`, 'ANNOUNCE');

  //request more info from this announcer
  var req = http.request(
    { host: rinfo.address,
      method: "GET",
      path:'/descriptor'
    },
    (res) => {
      res.setEncoding('utf8');
      res.on('data', (buff) => {

        //update local info about the announcer
        let matches = Store.find({'chipId': cid.toString()});
        if (matches.length === 0 ) {

          let device  = {};
          device.address = rinfo.address;
          device.services = JSON.parse(buff);
          device.chipId = cid.toString();
          device.lastSeen = new Date();
          device.status = Store.st.NEW;

          var id = Store.add(device);
          console.log(Store.find({"id":id}));
          //emit an event for this
          ipc.server.broadcast(EV_DEV_DISCOVERED, {});

        } else {
          matches[0].address = rinfo.address;
          matches[0].services = JSON.parse(buff);
          matches[0].lastSeen = new Date();
          matches[0].status = Store.st.UPDATED;

          Store.update(matches[0]);

          //emit an event for this
          ipc.server.broadcast(EV_DEV_UPDATED, {});
        }
      });
    });

  req.on('error',(e) => {
    log.w(`Unable to get device descritpor: $(e.message)`);
  });

  req.end();
});

//start ipc server
log.i("Starting server");
ipc.server.start();

//bind udp announce socket
sv.bind (config.network.announce.port, () => {
  sv.addMembership(config.network.announce.ip);
});
