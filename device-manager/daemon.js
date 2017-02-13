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
    ipc.server.emit(socket, EV_DEV_GET ,{
      status:200,
      data: devCtrl.get(data.ids)
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
sv.on('message',(msg, rinfo) => {
  //this should be an id of new device awaking
  log.i(`New announce message from ${rinfo.address}, chip id: ${msg}`, 'ANNOUNCE');

  //request more info from this announcer
  var req = http.request(
    { host: rinfo.address,
      method: "GET",
      path:'/descriptor'
    },
    (res) => {
      res.setEncoding('utf8');
      res.on('data', (buff) => {
        console.log('buff' + buff);

        //update local info about the announcer
        if (Store.find({'chipId':msg}) != -1 ) {
          //Store.add();
        } else {
          //Store.update();
        }

        //emit an event for this
        ipc.server.emit(EV_DEV_DISCOVERED, {});
      });
    });

  req.on('error',(e) => {
    log.warn(`Unable to get device descritpor: $(e.message)`);
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
