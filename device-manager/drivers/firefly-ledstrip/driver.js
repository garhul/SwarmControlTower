/***********************************
Author: <Adrian Gesto>
License: Apache 2
Version: 0.2
***************************************/

const dgram = require('dgram');
const Color = require('color');

//TODO:: standarize methods to a common "driver" interface

module.exports = function(service) {
  const constants = {
    CMD_OFF: 0x03,
    CMD_TEST: 0x04,
    CMD_FILL: 0x02,
    CMD_SET_BRIGHTNESS: 0x05,
    CMD_SET_RANGE: 0x01,
    CMD_RUN_EFFECT:0x07
  };

  /**
  Sends buffer to the specified port/address as configured on the service Object
  returns a promise with the response from the device or a timeout response
  */

  function _send(buffer) {
    const udpsvc = dgram.createSocket('udp4');
    //TODO:: handle socket timeouts

    return new Promise((resolve,reject) => {
      udpsvc.on("message", (data, remote) => {
        udpsvc.close();
        resolve(data);
      });

      udpsvc.send(buffer, 0, buffer.length, service.port, service.address, (err) => {
        if (err) {
          udpsvc.close();
          reject(new Error(`Error reaching service: ${service.name} -  ${err.message}`));
        }
      });

      setTimeout(()=>{
        reject(new Error("Device didn't respond"));
        //we din't get a response
        udpsvc.close();
      }, 100);

    });
  }

  function exec(payload) {


    //prepare payload for the current command
    console.log("Received command request: [" + parseInt(payload.cmd).toString(16) + "] with payload: " + JSON.stringify(payload));

    switch (parseInt(payload.cmd)) {
      case constants.CMD_SET_RANGE:
          // if (end > device.channels) end = device.channels;
          // if (start < 0) start = 0;

          // var color = Color(payload.color);
          // _send(Buffer.from([0x01, start, end, color.red(), color.green(), color.blue()]), cb);
            console.dir(color);
        break;


      case constants.CMD_FILL:
        try {
          var color = Color(payload.data);
          return _send(Buffer.from([constants.CMD_FILL, color.red(), color.green(), color.blue()]));
        } catch (err) {
          return {error:true, message: `Invalid Payload data [${payload.data}]`}
        }
      break;

      case constants.CMD_OFF:
          return _send(Buffer.from([constants.CMD_OFF]));
        break;

      default:
        return {error: true, message:`Invalid command [${payload.cmd}]`};
    }
  }

  return {
    exec:exec,
    constants:constants
  }
}
