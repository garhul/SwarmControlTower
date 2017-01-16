'use strict';
var ipc = require('node-ipc');
console.log("setting the ready staste");

//TODO:: move this to a cfg file (nconf to be implemented)
var config =  {
  ipc: {
    path:"/tmp/iot-manager-daemon"
  }
};

ipc.connectTo('manager', config.ipc.path, function() {
  ipc.of.manager.on('connect', function() {
    console.info("Connected to device manager \n");
  });

  ipc.of.manager.on('disconnect', function() {
    console.info('disconnected from device manager ');
  });

  ipc.of.manager.on('error', function(err) {
    console.error("error communicating with device manager")
    console.error(err.message);
  });

  ipc.of.manager.on('message', function(data) {
    console.info('got a message from device manager : ', data);
  });
});

var getDevices = function() {

  return new Promise(function(resolve,reject) {
    try {
      ipc.of.manager.on('device.list',function(data){
        ipc.of.manager.off('device.list','*');
        if (data.error) return reject(data);
        resolve(data);
      });

      ipc.of.manager.emit('device.list', null);
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = {
  getDevices: getDevices
}
