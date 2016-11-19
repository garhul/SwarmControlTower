'use strict';

module.exports = {
  ipc: {
    path:"/tmp/iot-manager-daemon",
    networkHost     : 'localhost', //should resolve to 127.0.0.1 or ::1 see the table below related to this
    networkPort     : 8000,
    encoding        : 'utf8',
    rawBuffer       : false, //json comm for the moment
    sync            : true,
    silent          : true, //we want logs
    logInColor      : true, //we want fancy logs
    logDepth        : 5,  //
    maxConnections  : 100, // max unix sockets to use
    retry           : 500, //
    maxRetries      : 5,
    stopRetrying    : 5
  },
  db: {
    file: "data/db.json"
  },
  paths: {
    devices: __dirname + "/../devices/",
    enabledDevices: __dirname + "/../devices-enabled/",
    drivers: __dirname + "/../drivers/"
  }
}
