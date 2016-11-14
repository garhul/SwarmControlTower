var config  = require("./config/config");
var ipc = require('node-ipc');
var fs = require('fs');

// bootstrap by parsing all device descriptors into memory
var devices = {};
var filenames = fs.readdirSync(config.paths.devices);

try {
  filenames.forEach( function(filename) {
    var descriptor = JSON.parse(fs.readFileSync(config.paths.devices + filename, 'utf8'))
    console.info ("reading file: " + filename);
    console.dir(descriptor);
    devices[descriptor['human-name']] = descriptor;
  });
} catch (e) {
  console.error("unexpected error processing device descritpors:", e.message);
}

// TODO: check for groups file

//load some controllers
var deviceController = require('./app/controllers/devices')(config, devices);
// var groupsController = require('./')

ipc.config = config.ipc;
ipc.serve(config.ipc.path, function() {

  //handle standard events
  ipc.server.on('socket.disconnected',
    function(socket, destroyedSocketId) {
      console.log('Socket disconnected:' + socket);
  });

  //bind device methos
  deviceController.bind(ipc.server);
});

//start ipc server
console.info("Starting device manager on socket " + config.ipc.path);
ipc.server.start();
