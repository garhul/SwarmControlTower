var config  = require("./config/config");
var ipc = require('node-ipc');
var fs = require('fs');

const EV_DEV_GET = 'devices.get';
const EV_DEV_ADD = 'devices.add';
const EV_DEV_REMOVE = 'devices.del';

// prepare devices store
var store = require('./app/models/devices')(config);
//load some controllers
var devicesController = require('./app/controllers/devices')(config, store);
// var groupsController = require('./')

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
    console.warn("Communications error: " + err.message);
  });

  //bind device methods

  // get devices
  ipc.server.on(EV_DEV_GET ,(data, socket) => {
    ipc.server.emit(socket, EV_DEV_GET ,{
      status:200,
      data: devicesController.get(data.ids)
    });
  });

  //add a device
  ipc.server.on(EV_DEV_ADD ,(data, socket) => {
    var data = devicesController.add(data);
    var rsp = {};
    rsp.data = data;
    rsp.status = (data === false)? 500: 200;

    ipc.server.emit(socket, EV_DEV_ADD ,rsp);

  });

  //remove a device
  ipc.server.on(EV_DEV_REMOVE ,(data, socket) => {
    ipc.server.emit(socket, EV_DEV_REMOVE ,devicesController.remove(data.ids));
  });


});

//start ipc server
console.info("Starting device manager");
ipc.server.start();
