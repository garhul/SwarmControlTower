'use strict';

module.exports = function (config, db) {
  //if collection does not exist, just create it
  var devices = db.getCollection('devices');

  if (!devices)
    devices = db.addCollection('devices');

  return {

    add:function(data) {
      //TODO:: validate data
      devices.insert(data);
    },

    remove: function() {

    },

    list: function() {
      var view = devices.addDynamicView('all');
      view.applySimpleSort('name');
      return view.data();
    },

    info:function() {}
  }
};
