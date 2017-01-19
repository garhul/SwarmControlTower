'use strict';
var ipc = require('node-ipc');

var defaults = {
  path:"/tmp/iot-manager-daemon",
  maxRetries: 3
}


module.exports = function(cfg) {
 ipc.config = Object.assign(defaults,cfg);

 var isConnected = false;

 ipc.connectTo('manager', function() {
   ipc.of.manager.on('connect', function() {
     isConnected = true;
     console.info("Connected to device manager \n");
   });

   ipc.of.manager.on('disconnect', function() {
     isConnected = false;
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

 function getDevices() {
   return new Promise(function(resolve,reject) {

     if(!isConnected)
      reject(new Error("IPC bridge is not connected"));

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

 return {
  isConnected:isConnected,
  getDevices: getDevices,
  // removeDevice: removeDevice,
  // addDevice: addDevice,
  // restart: restart,
  // reload: reload,
 }
}
