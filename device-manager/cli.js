//@deprecated

var config = require('./config/config');
var ipc = require('node-ipc');
var argv = require('minimist')(process.argv.slice(2));

config.ipc.silent = true;
ipc.config = config.ipc;

//TODO:: validate argv input
function validate() {

}

function getEvent() {
  if ('add-device' in argv) {
    return 'device.add';
  }

  if ('list-device' in argv) {
    return 'device.list';
  }

  if ('remove-device' in argv) {
    return 'device.remove';
  }

  if ('send' in argv) {
    return 'device.send';
  }
}

function getPayload() {
  var payload = {};
  console.dir(argv);

  if ("add-device" in argv) {
    payload.name = argv['add-device'];
    payload.descriptor_path = argv._[0];

    return payload;
  }

  if ("send" in argv) {
    payload.name = argv['send'];
    payload.cmd = "setRGBRange";
    payload.data = {start:0,end:5,color:"#ff6600"};
    return payload;
  }

  return null;

}

console.info("Opening connection to ipc server...");
ipc.connectTo( 'manager', config.ipc.path, function() {
  var ev = getEvent();

  ipc.of.manager.on( 'connect',
    function() {
      var ev = getEvent();
      var payload = getPayload();

      console.info("Connection stablished \n");
      console.info(ev,payload);

      ipc.of.manager.on(ev, function(data){
        console.dir(data, {colors:true});
        // console.dir(data);
      });

      ipc.of.manager.emit(ev, payload);
    }
  );

  ipc.of.manager.on(
    'disconnect',
    function(){
      ipc.log('disconnected from device manager'.notice);
    }
  );

  ipc.of.manager.on(
    'message',  //any event or message type your server listens for
    function(data){
      ipc.log('got a message from device manager : '.debug, data);
    }
  );
});
