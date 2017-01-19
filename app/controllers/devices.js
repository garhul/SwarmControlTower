'use strict';
var bridge = require("../lib/manager-bridge")({path:"/tmp/iot-manager-daemon"});


/** return all devices from the devices file **/
function list(req, res, next) {
  bridge.getDevices().then(
    function(response){
      console.log("returned from daemon:" + response);
      res.send(response);
    },
    function(err) {
      console.error(err);
      res.status(500).send(data);
    });
}


/** tell if the service is connected **/

function getBridgeStatus(req, res, next)  {

}

/** remove a device descriptor from the devices file **/
function remove(req, res){
  console.log(req.body);
  res.send('');
}

/** return a single device descriptor **/
function get(req, res, next) {
  console.log(req.body);
  res.send('')
}

/** add a  device descriptor **/
function add(req, res, next) {
  console.log(req.body);
  res.send('')
}

/** what's the status? **/
function status(req,res, next){
  res.header('content',"application/json").status("200").send("disconnected");
}

module.exports = {
  list: list,
  get: get,
  add: add,
  status:status
}
