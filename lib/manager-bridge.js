'use strict';
var ipc = require('node-ipc');

//TODO:: move this to a cfg file (nconf to be implemented)
var config =  {
  ipc: {
    path:"/tmp/iot-manager-daemon"
  }
};

ipc.connectTo('manager', config.ipc.path, function() {
  ipc.of.manager.on( 'connect', function() {
      console.info("Connection stablished \n");

      ipc.of.manager.on(ev, function(data){
        // when data returns
        console.dir(data, {colors:true});

      });

      ipc.of.manager.emit(ev, payload);
    }
  );

  ipc.of.manager.on(
    'disconnect',
    function() {
      console.info('disconnected from device manager ');
    }
  );

  ipc.of.manager.on(
    'message',  //any event or message type your server listens for
    function(data){
      console.info('got a message from device manager : ', data);
    }
  );
});
},

var devices = {

  //  var events = ['device.add','device.list','device.remove',
  // 'device.send','device.update','device.info'];
  add: function(device) {

  },

  list: function() {

  },

  update: function(groupId, data) {

  },

  remove: function(groupId) {

  },

  send: function(payload) {

  }
};

module.exports = {
  devices: {
    request:null
  }
}
