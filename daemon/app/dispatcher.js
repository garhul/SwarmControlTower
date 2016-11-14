'use strict';

module.exports = function(config, db) {
  var endpoints = {
    'devices': {
      'list':'list',
      'add':'add',
      'info':'info',
      'remove':'remove',
      'disable':'disable',
      'enable':'enable'
    },
    'groups': {
      'create':'create',
      'list':'list',
    }
  }
  return {
    init:function(server) {
      console.log("initializing event dispatcher");

      var device_events = ['device.list','device.add','device.remove','device.info'];
      var ev = null;
      device_events.forEach( function(ev) {
        server.on(ev, function(data,socket) {
          if (!ev in endpoints) {
            console.warn("unrecognized message received: " + ev);
            server.emit(socket,'disconnect');
          }
          endpoints[ev]
          console.log("serving event " + ev);
        });
      });
    }
  }
};
