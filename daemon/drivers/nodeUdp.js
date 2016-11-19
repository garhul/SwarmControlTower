const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const cli = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.dir(msg);
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  //echo the message
  var buf = Buffer.from("OK");
  console.log("responding...");
  console.dir(buf);
  cli.send(buf, 0, buf.length, rinfo.port, rinfo.address, function(err) {
    if(err) {
      console.error(`there was an error ${err}`);
      cli.close();
    }
    return false;
  });

});

 server.on('listening', () => {
   var address = server.address();
   console.log(`server listening ${address.address}:${address.port}`);
 });

server.bind(5000);
