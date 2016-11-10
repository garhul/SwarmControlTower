var config = require('./config/config');
var ipc = require('node-ipc');
var argv = require('minimist')(process.argv.slice(2));
ipc.config = config.ipc;


function validate() {

}


function getEvent() {

}

//parse command line to perform an ipc / udp request
/*------------------- General --------------------------*/


//currently under test:
console.dir(argv);

// processRequest("hola che");




/*------------------- DEVICES -------------------------*/

//list all

//describe

//add
if (argv.['add-device']) {
  var device_name = argv.['add-device'];
  var device_descriptor = argv['-d'];

}
//remove

//add device to group

//remove device from group


/*---------------------- GROUPS -----------------------*/

//list

//describe

//add

//remove





console.info("Opening connection to ipc server...");
ipc.connectTo( 'manager', config.ipc.path, function() {
    ipc.of.manager.on( 'connect',
      function() {
        console.info("Connection stablished \n");
        ipc.of.manager.emit(getEvent(),getPayload());
        ipc.disconnect('manager');
      }
    );

    ipc.of.manager.on(
      'disconnect',
      function(){
        ipc.log('disconnected from world'.notice);
      }
    );

    ipc.of.manager.on(
      'message',  //any event or message type your server listens for
      function(data){
        ipc.log('got a message from world : '.debug, data);
      }
    );
  }
);
