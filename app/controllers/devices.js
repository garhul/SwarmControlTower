'use strict';
var bridge = require("../lib/manager-bridge");

module.exports = {
  list:function(req, res, next) {
    bridge.getDevices().then(
      function(response){
        console.log("returned from daemon:" + response);
        res.send(response);
      },
      function(err) {
        console.error(err);
        res.status(500).send(data);
      });
  },

  remove:function(req, res){
    console.log(req.body);
    res.send('');
  },

  update:function(req,res){
    console.log(req.body);
    res.send('');
  },

  add:function(req,res){

  },

  info:function(req,res){

  }
}
