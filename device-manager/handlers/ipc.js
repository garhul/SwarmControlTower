const CFG  = require("./config/config");
const IPC = require('node-ipc');
const log = require('./app/utils/logger.js')(CFG);


const EVENTS = {
  GET_DEVICES: 'gd',
  RELOAD_DEVICES: 'rd',
  DELETE_DEVICE: 'rmd',
};

// const EV_DEV_GET = 'devices.get';
// const EV_DEV_ADD = 'devices.add';
// const EV_DEV_REMOVE = 'devices.del';
// const EV_DEV_DISCOVERED = 'devices.discovered';
// const EV_DEV_UPDATED = 'devices.updated';
// const EV_DEV_MESSAGE = 'devices.message';

IPC.config = CFG.ipc;

IPC.serve(() => {
  IPC.server.on('socket.disconnected', (socket, destroyedSocketId) => {
    log.i('Socket disconnected' + destroyedSocketId);
  });

  IPC.server.on('connect',() => {
    log.i("New connection stablished");
  });

  IPC.server.on('err',(err) => {
    log.w("Communications error: " + err.message, "IPC");
  });

  // get devices
  IPC.server.on(EVENTS.GET_DEVICES ,(data, socket) => {
    log.n('requested devices list');
    IPC.server.emit(socket, EVENTS.GET_DEVICES ,{
      data: devCtrl.get(data.filter)
    });
  });

  //add a device
  // ipc.server.on(EV_DEV_ADD ,(data, socket) => {
  //   var data = devCtrl.add(data);
  //   var rsp = {};
  //   rsp.data = data;
  //   rsp.status = (data === false)? 500: 200;
  //
  //   ipc.server.emit(socket, EV_DEV_ADD ,rsp);
  // });
  //
  // //remove a device
  // ipc.server.on(EV_DEV_REMOVE ,(data, socket) => {
  //   ipc.server.emit(socket, EV_DEV_REMOVE ,devCtrl.remove(data.ids));
  // });
  //
  // /** Message a device **/
  // ipc.server.on(EV_DEV_MESSAGE ,(data, socket) => {
  //   log.n("Recevied message device request");
  //   log.d(JSON.stringify(data));
  //
  //   devCtrl.message(data.id, data.message).then(
  //     (data) => {
  //       var rsp = {};
  //       rsp.data = data;
  //       rsp.status = 200;
  //       ipc.server.emit(socket, EV_DEV_MESSAGE ,rsp);
  //     },
  //     (err) => {
  //       ipc.server.emit(socket, EV_DEV_MESSAGE ,{'status':404,'error':'no response from device'});
  //   });
  // });
});

//start ipc server
log.i("Starting IPC server");
IPC.server.start();
