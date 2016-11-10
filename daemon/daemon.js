var config  = require("./config/config");
var ipc = require('node-ipc');
console.log(config.db.file);
var db = new (require('lokijs'))(config.db.file);
//dispatcher is not required yet

//initialize collections
if (!db.getCollection('devices'))
  db.addCollection('devices');

//load some controllers
var devices = require('./app/controllers/devices')(config,db);

ipc.config = config.ipc;

//set ipc dispatchers
ipc.serve(config.ipc.path, function() {

  // ipc.server.on('message', function(data, socket) {
  //
  //   console.log("got some data ", data);
  //
  //   dispatcher.dispatch(data);
  //
  //   ipc.server.emit(socket, 'message', "hey como va? " + data);
  //
  // });

  ipc.server.on('device.add', function(data, socket) {
    //add device to db
    devices.add(data);
    //respond with what happened
    ipc.server.emit(socket,'message',"ok");
  });

  ipc.server.on('device.info', function(data, socket){
    ipc.server.emit(socket, 'device.info', devices.info(data.device_id));
  });

  ipc.server.on('socket.disconnected',
    function(socket, destroyedSocketId) {
      console.log('destroyed some socket:' + destroyedSocketId);
    });
});

//start daemon
console.info("Starting device manager on socket " + config.ipc.path);
ipc.server.start();
