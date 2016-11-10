'use strict';

var defaults = {
  ipc: {
    path:"/tmp/iot-manager-daemon",
    networkHost     : 'localhost', //should resolve to 127.0.0.1 or ::1 see the table below related to this
    networkPort     : 8000,
    encoding        : 'utf8',
    rawBuffer       : false, //json comm for the moment
    sync            : true,
    silent          : false, //we want logs
    logInColor      : true, //we want fancy logs
    logDepth        : 5,  //
    maxConnections  : 100, // max unix sockets to use
    retry           : 500, //
    maxRetries      : 5,
    stopRetrying    : 5
  },
  db: {
    file: "data/db.json"
  }
}











//
// var config = {
//   ipc: {
//     port: "./socket"
//   },
//
//   devices_path: __dirname + "../devices_enabled/",
//
// }

//just for now
var config = defaults;

module.exports = config;
