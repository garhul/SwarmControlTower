/** Devices store model, just in memory management backed by a file **/
'use strict';
var fs = require('fs');

module.exports = (config) => {
  var store = new Object();


  /** generates an unique 24 bit hex string as identifier for a device **/
  function _getUniqueId() {
    var id =  Math.random().toString(16).substring(2,8).toUpperCase();

    while (!id in store) {
      id =  Math.random().toString(16).substring(2,8).toUpperCase();
    }
    return id;
  }

  /** retrieves device descriptors for every devices servicing on that address
  @params addr String
  @returns Array<Object>

  */
  function getDevicesForAddr(addr) {

  }

  /** parse store file into mem */
  function load() {
    console.info(`Parsing devices file ${config.paths.deviceStore}`);
    try {
      store = JSON.parse(fs.readFileSync(config.paths.deviceStore, 'utf8'));
    } catch (e) {
      console.error("unexpected error processing devices descritpors:", e.message);
    }
  }

  function _validate(data) {
    return true;
  }

  function add(data) {
    console.info("adding new device");
    if (!_validate(data))
      return new Error("Invalid data");

    var base = {
        "device": { //required
          "driver":"",
          "version":"0.1",
          "chanels":"",
          "address":"",
          "networkName":"",
          "port":null
        },
      "name":"New Device",
      "location":"",
      "description": "Awaiting configuration"
    };

    console.log("New device to be added:");
    console.dir(Object.assign(base, data));

    store[_getUniqueId()] = Object.assign(base, data);
    save();
  }

  /** write current store into disk **/
  function save() {
    fs.writeFileSync(config.paths.deviceStore +'-bk', JSON.stringify(store, null, 2), {encoding:'utf8'});
  }

  /** mark specified id or range of ids as disabled */
  function disable(ids) {}

  /** mark specified id or range of ids as enabled */
  function enable(ids) {}

  /** relod store file **/
  function reload() {
    store = null;
    load();
  }

  /** updates the specified device id with the new descritor key-value set*/
  function update(id, descriptor) {

  }

  /** removes the specified devices from the current store **/
  function remove(ids) {
    var removedIds = [];
    ids.forEach((v) => {
      try {
        if (!(v in store)) {
          console.log("Unable to remove key " + v);
          return;
        }
        delete store[v];
        removedIds.push(v);
      } catch (ex) {
        console.log("Unable to remove key " + v);
      }
    });

    return {"removed":removedIds};
  }

  /** returns device descriptor associated with that id(s)
      or all if ids === null **/
  function get(ids) {
    if( ids === null ) {
      return store;
    }

    return [];
  }


  /** load devices first **/
  load();

  return {
    add: add,
    disable: disable,
    get: get,
    enable: enable,
    remove: remove,
    reload: reload,
    update: update,
  };
}
