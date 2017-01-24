'use strict';

module.exports = function devicesCtrl (bridge) {
  /** return all devices from the devices file **/
  function list(req, res, next) {
    bridge.devices.get(null).then(
      function(response){
        console.dir(response);
        res.send(response);
      },
      function(err) {
        console.error(err);
        res.status(500).send(data);
      });
  }

  /** remove a device descriptor from the devices file **/
  function remove(req, res, next){
    bridge.devices.remove(req.body).then(
      (rsp) => {
        res.status(201).send({data:rsp});
      },
      (err) => {
        console.log(err);
        res.status(500).send({error:true});
      }
    );
  }

  /** return device descriptor for the required ids**/
  function get(req, res, next) {
    console.log(req.body);
    res.send('')
  }

  /** add a  device descriptor **/
  function add(req, res, next) {
    console.log(req.body);
    // TODO:: validate req.body first

    bridge.devices.add(req.body).then(
      (rsp) => {
        res.status(201).send({data:rsp});
      },
      (err) => {
        console.log(err);
        res.status(500).send({error:true});
      }
    );
  }

  return {
    list: list,
    get: get,
    add: add,
    remove:remove,
  }
}
