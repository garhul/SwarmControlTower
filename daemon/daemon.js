var config  = require("./config/config");
var net = require('net');

var server = net.createServer((client) => {

  client.on("end",function(){

  });





});

//start daemon
console.info("starting daemon on port " + config.daemon.port);
server.listen(config.daemon.port); 