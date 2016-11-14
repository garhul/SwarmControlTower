const dgram = require('dgram');
const udpsvc = dgram.createSocket('udp4');

module.exports = function(device) {

  _send: function(payload) {
    udpsvc.send(new Buffer(payload), 0, payload.length, device.port, device.'network-name', function(err) {
      udpsvc.close();
      if (err) {

        console.error("ERROR REACHING DEVICE: " + err.message);
        return { error: true, message:"ERROR REACHING DEVICE" };
      }
      //TODO:: check for incoming data from device

    });
  }
  return {

    setRGBRange: function(start, end, color) {
      if (end > device.channels) {
        end = device.channels;
      }

      if (start < 0) {
        start = 0;
      }

      _send([start,end,color.r,color.g,color.b]);
    },

    setHSLRange: function(start, end, h, s ,l) {

    },

    fadeTo:function() {},

    fadeRangeTo:function() {},

    setColor: function(color) {},

    setEffect: function(effect) {},

    setName: function (name) {},

    getDescriptor: function() {},

    //returns the current status of the strip (colors, and stuff)
    getStatus:function() {}

    reboot:function(){},

    off: function() {
    }

  }
}
