/** Devices store model, just in memory management backed by a file **/
'use strict';
module.exports = (config) => {
  const fs = require('fs');
  const log = require('../utils/logger')(config);
  const _ = require('underscore');
  const STATUSES = {'NEW':'NEW','ENABLED':'ENABLED','DISABLED':'DISABLED','UNREACHEABLE':'UNREACHEABLE'};
  var Store =  new Object();

  /** generates an unique 24 bit hex string as identifier for a device **/
  function _getUniqueId() {
    var id =  Math.random().toString(16).substring(2,8).toUpperCase();

    while (!id in Store) {
      id =  Math.random().toString(16).substring(2,8).toUpperCase();
    }
    return id;
  }

  function _validate(device) {
    console.dir(device);
    //device requires at least an address
    if (!"address" in device)
      return false;

    var blocks = device.address.split(".");

    if (blocks.length != 4)
      return false;

    for (var block in blocks) {
      if (parseInt(block) > 255 || parseInt(block) < 0)
        return false
    }

    return true;
  }

  function add(device) {
    if (!_validate(device))
      return false;

    let id = _getUniqueId();
    log.i("added new device with id " + id);
    device.id = id;
    Store[id] = device;

    return id;

  }

  /** removes the specified devices from the current store **/
  function remove(ids) {
    var removedIds = [];
    ids.forEach((v) => {
      try {
        if (!(v in store)) {
          log.w("Unable to remove key " + v);
          return;
        }
        delete store[v];
        removedIds.push(v);
      } catch (ex) {
        log.w("Unable to remove key " + v);
      }
    });

    return {"removed":removedIds};
  }

  function update(device) {
    if (!_validate(device))
      return false;

    Store[device.id] = device;

    return device;
  }

  function get(ids) {

  }

  function load() {
    log.i(`Parsing devices file ${config.paths.deviceStore}`);
    try {
      Store = JSON.parse(fs.readFileSync(config.paths.deviceStore, 'utf8'));
      for (var id in Store) {
        Store[id].id = id;
      }
    } catch (e) {
      log.e("unexpected error processing devices descritpors:", e.message);
    }
  }

  /** write current store into disk **/
  function save() {
    fs.writeFileSync(config.paths.deviceStore +'-bk', JSON.stringify(Store, null, 2), { encoding:'utf8' });
  }

  function reload() {
    Store = {};
    load();
  }

  function find(filter = {}) {
    return _.where(Store, filter);
  }

  //startup
  load();

  return {
    add:add,
    remove:remove,
    update:update,
    get:get,
    load:load,
    save:save,
    reload:reload,
    find:find ,
    st: STATUSES
  }

}
