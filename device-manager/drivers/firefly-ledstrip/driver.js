/***********************************
Author: <Adrian Gesto>
License: Apache 2
Version: 0.1
***************************************/

const dgram = require('dgram');
const Color = require('color');

//TODO:: standarize methods to a common "driver" interface



module.exports = function(service) {
  const CMD_SET_STRIP = 0x1;
  const CMD_SET_LED = 0x2;
  const CMD_TEST = 0x3;

  function _send(buffer, cb) {
    const udpsvc = dgram.createSocket('udp4');
    //TODO:: handle socket timeouts
    if (cb != null) {
      udpsvc.on("message",function(data, remote){
        cb(null, data);
        udpsvc.close();
      });
    }

    udpsvc.send(buffer, 0, buffer.length, service.port, service['network-name'], function(err) {
      if (err) {
        console.error(`ERROR REACHING DEVICE: ${service['name']} -  ${err.message}`);
        udpsvc.close();
        cb(new Error("ERROR REACHING DEVICE"), null);
        return;
      }

      if (cb == null) udpsvc.close(); //we don't expect a response

    });
  }

  return {

    /**
    * send data to the actual device
    * but first prepare the payload accordingly to the
    * requested command
    * we may require a response from the actual device
    *
    */
    exec: function(cmd, payload) {
      var buf = null;
      //prepare payload for the current command
      switch (cmd) {
        case 'setColorRange':
          this.setColorRange(payload, 'RGB', function(err, data) {
            if (err) {
              console.error(e.message);
              cb(err, null); //pass on the error
              return;
            }
            //if there's some data also pass it on
            cb(null, data);
          });
          break;

        case 'fadeTo':
          break;

        case 'fadeRangeTo':
          break;

        case 'off':
          break;

        case 'getStatus':
          break;

        default:
          console.error(`UNRECOGNIZED DRIVER COMMAND [${payload.cmd}]`);
          return {error: true, message:`INVALID COMMAND [${payload.cmd}]`};
      }
    },

    /**
    sets the requested pixel range to color (mode is not implemented yet)
    */
    setColorRange: function(payload, mode, cb) {
      if (end > device.channels) end = device.channels;
      if (start < 0) start = 0;

      var color = Color(payload.color);
      _send(Buffer.from([0x01, start, end, color.red(), color.green(), color.blue()]), cb);

    },

    setMaxBrightness: function(start, end, color) {},

    fadeTo:function() {},

    fadeRangeTo:function() {},

    setEffect: function(effect) {},

    setName: function (name) {},

    getDescriptor: function() {},
    //returns the current status of the strip (colors, and stuff)
    getStatus:function() {},

    reboot:function() {},

    off: function() {},

    CMD_SET_STRIP: CMD_SET_STRIP
  }
}
