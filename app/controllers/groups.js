'use strict';
module.exports = {
  /** fetch the json for the groups and send it */
  /** TODO:: load from file and persist it into file **/
  get:function(req, res, next){

    var data = new Array();
    //TODO:: load from groups file, or db or whatever
    data.push({"name":"living","devices":[{'id':'BF93','name':'Mesa'}]});
    data.push({"name":"estudio","devices":[{'id':'BF94','name':'Lampara 1'},{'id':'BF91','name':'Lampara 2'}]});

    res.send(data);
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

  addDevice:function(req,res){

  }
}
