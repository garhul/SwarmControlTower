'use strict';
var ipc = require('node-ipc');

var defaults = {
  socketRoot: '/tmp/',
  appspace: 'sct.',
  maxRetries: 3
}

const EV_DEV_GET = 'devices.get';
const EV_DEV_ADD = 'devices.add';
const EV_DEV_REMOVE = 'devices.del';
const EV_DEV_DISCOVERED = 'devices.discovered';
const EV_DEV_UPDATED = 'devices.updated';
const EV_DEV_MESSAGE = 'devices.message';

module.exports = function(cfg) {
 ipc.config = Object.assign(defaults,cfg);
 console.log(ipc.config);
 var connected = false;

 ipc.connectTo('manager', ()=> {
   ipc.of.manager.on('connect', ()=> {
     connected = true;
     console.info("Connected to device manager \n");
   });

   ipc.of.manager.on('disconnect', ()=> {
     connected = false;
     console.info('disconnected from device manager ');
   });

   ipc.of.manager.on('error', (err)=> {
     console.error("error communicating with device manager")
     console.error(err.message);
   });

   ipc.of.manager.on('message', (data)=> {
     console.info('got a message from device manager : ', data);
   });

   //events we want to watch to
   ipc.of.manager.on('devices.updated',(data)=> {
     console.log("received a device update!", data);
   });

 });

 function isConnected() {
   return connected;
 }


 function _sendAndReceive(ev, payload) {
   return new Promise((resolve, reject)=> {     
     if(!connected)
      return reject(new Error("IPC bridge is not connected"));
      //TODO:: add timeout for waiting responses
      try {
        ipc.of.manager.on(ev, function(data) {
          ipc.of.manager.off(ev,'*');
          if (data.error) return reject(data);
          return resolve(data);
        });
        ipc.of.manager.emit(ev, payload);
      } catch (ex) {
        return reject(ex);
      }
    });
 }

 var devices = {
   add: function(descriptor) {
     return _sendAndReceive(EV_DEV_ADD, descriptor);
   },

   get: function(filter) {
     return _sendAndReceive(EV_DEV_GET, filter);
   },

   remove: function(ids) {
     return _sendAndReceive(EV_DEV_REMOVE, {"ids":ids});
   },

   message: function(id, message ) {
     return _sendAndReceive(EV_DEV_MESSAGE, {id, message});
   }
 };

 return {
  isConnected:isConnected,
  devices: devices
 }
}
