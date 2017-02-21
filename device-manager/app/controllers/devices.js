'use strict';
var fs = require('fs');

module.exports = (config, store) => {

  function get(filter) {
    return store.find(filter);
  }

  function add(descriptor) {
    return store.add(descriptor);
  }

  function reload() {
    store.reload();
  }

  function remove(ids) {
    return store.remove(ids);
  }

  return {
    add:add,
    get:get,
    remove:remove,
    reload:reload,
  };

}

//   var deprecated =  {
//     /**
//     * bind server events related to this particular controller
//     */
//     bind: function(server) {
//       var _self = this;
//       console.log("initializing devices controller");
//       var ev = null;
//       events.forEach( function(ev) {
//         server.on(ev, function(data, socket) {
//           console.info("serving event " + ev);
//           if (ev.indexOf("add") != -1) {
//             server.emit(socket, ev, _self.add(data.name, data.descriptor));
//           } else if (ev.indexOf("list") != -1) {
//             server.emit(socket, ev, store);
//           } else if (ev.indexOf("info") != -1) {
//             console.dir(data);
//             server.emit(socket, ev, _self.info(data.name))
//           } else if (ev.indexOf("send") != -1) {
//             _self.send(data, function(err, response){
//               if (err) {
//                 console.error(err.message);
//                 server.emit(socket, ev, { error:true, message:err.message });
//                 return;
//               }
//               //driver *must* always provide an answer
//               server.emit(socket,ev, response);
//             });
//           }
//         });
//       });
//     },
//
//     /**
//     * add a device to our devices list and store its descriptor
//     **/
//     add: function(name, descriptor) {
//       if (!isDescriptorValid(descriptor)){ //TODO:: validate descriptor data
//         console.warn("invalid descriptor provided:");
//         console.dir(descriptor);
//         return {error: true, message: "INVALID DESCRIPTOR"};
//       }
//
//       if(name in devices) {//TODO:: validate device name
//         console.warn(`device [${name}] already registered`);
//         return {error: true, message: "DEVICE NAME IN USE"};
//       }
//
//       //write device descriptor to disk
//       fs.writeFile(name + '.json', (err) => {
//         if (err) {
//           console.warn('Error saving device descriptor', err);
//           return {error:true ,message: "UNABLE TO SAVE DEVICE DESCRIPTOR"};
//         }
//         store[name] = descriptor;
//         return {error:false, message: "DEVICE ADDED"};
//       });
//     },
//     /**
//     * updates device descriptor
//     */
//     update: function (name, descriptor) {
//
//     },
//     /**
//     * broadcast message to all devices and request device status report
//     **/
//     report: function() {
//
//     },
//     /**
//     * removes a device from the "enabled list"
//     */
//     remove: function(name) {
//       if (name in devices) {
//         store[name] = null;
//       } else {
//         console.warn ("no device named " + name + "found \n");
//       }
//     },
//
//     /**
//     * provides info from a particular device
//     */
//     info: function(name) {
//       return store[name];
//     },
//
//     /**
//     * sends command to device
//     */
//     send: function(data, cb) {
//       if (!(data.name in store)) {
//         console.error(`DEVICE [${data.name}] NOT FOUND`);
//         cb (new Error("DEVICE NOT FOUND"), null);
//         return;
//       }
//
//       try {
//         var driver = require(config.paths.drivers + store[data.name].driver)(store[data.name]);
//         driver.exec(data.cmd, data.data, cb); //mala idea pasar el cb
//
//
//       } catch (e) {
//         console.error(e.message ,e);
//         cb(new Error("Unable to load driver"));
//       }
//     }
//   }
// };
