'use strict';

module.exports = {
  ipc: {
    socketRoot: '/tmp/',
    appspace: 'sct.',
    id:'manager',
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
  logger: {
    of:"./logs/app.log"
  },
    network: {
    announce:{ port:3001, ip:"225.0.0.1"},
  },
  db: {
    file: "data/db.json"
  },
  paths: {
    deviceStore: __dirname + "/devices.mock.json",
    drivers: __dirname + "/../drivers/"
  }
}
