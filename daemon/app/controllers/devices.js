'use strict';
var fs = require('fs');
module.exports = function (config, devices) {

  //TODO:: implement some sort of security?
  var events = ['device.add','device.list','device.remove',
                'device.send','device.update','device.info'];

  return {
    /**
    * bind server events related to this particular controller
    */
    bind: function(server) {
      var _self = this;
      console.log("initializing devices controller");
      var ev = null;
      events.forEach( function(ev) {
        server.on(ev, function(data, socket) {
          console.info("serving event " + ev);
          if (ev.indexOf("add") != -1) {
            server.emit(socket, ev, _self.add(data.name, data.descriptor));
          } else if (ev.indexOf("list") != -1) {
            server.emit(socket, ev, devices);
          } else if (ev.indexOf("info")) {
            console.dir(data);
            server.emit(socket, ev, _self.info(data.name))
          } else if (ev.indexOf("send")) {
            server.emit(socket, ev, _self.send(data.name, data.payload))
          }
        });
      });
    },

    /**
    * add a device to our devices list and store its descriptor
    **/
    add: function(name, descriptor) {
      if (!isDescriptorValid(descriptor)){ //TODO:: validate descriptor data
        console.warn("invalid descriptor provided:");
        console.dir(descriptor);
        return {error: true, message: "INVALID DESCRIPTOR"};
      }

      if(name in devices) {//TODO:: validate device name
        console.warn(`device [${name}] already registered`);
        return {error: true, message: "DEVICE NAME IN USE"};
      }

      //write device descriptor to disk
      fs.writeFile(name + '.json', (err) => {
        if (err) {
          console.warn('Error saving device descriptor', err);
          return {error:true ,message: "UNABLE TO SAVE DEVICE DESCRIPTOR"};
        }
        devices[name] = descriptor;
        return {error:false, message: "DEVICE ADDED"};
      });
    },
    /**
    * updates device descriptor
    */
    update: function (name, descriptor) {

    },
    /**
    * removes a device from the "enabled list"
    */
    remove: function(name) {
      if (name in devices) {
        devices[name] = null;
      } else {
        console.warn ("no device named " + name + "found \n");
      }
    },

    /**
    * provides info from a particular device
    */
    info: function(name) {
      return devices[name];
    },

    /**
    * sends command to device
    */
    send: function(name, payload) {
      if (!name in devices) {
        console.error(`DEVICE [${name}] NOT FOUND`);
        return {error: true, message: "DEVICE NOT FOUND"};
      }

      var driver = require(config.paths.drivers + devices[name].driver)(devices[name]);
      //execute command
      driver.[payload.cmd,payload.];
    }
  }
};
