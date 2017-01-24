'use strict';

module.exports = (bridge) => {
  var express = require('express');
  var router = express.Router();
  var groupsCtrl = require('../controllers/groups')
  var devicesCtrl = require('../controllers/devices')(bridge);
  var bridgeCtrl = require('../controllers/bridge')(bridge);

  //set the accept headers for the api routes
  router.use(function(req,res,next){
   req.headers.accept = 'application/json';
   next();
  });

  //groups api
  router.get('/groups',
    groupsCtrl.get
  );

  router.put('/groups',
    groupsCtrl.update
  );

  router.delete('/groups',
    groupsCtrl.remove
  );

  //bridge api
  router.get('/bridge', bridgeCtrl.status);

  //devices api
  router.get('/devices', devicesCtrl.list);
  router.post('/devices', devicesCtrl.add);
  router.delete('/devices',devicesCtrl.remove);
  //settings api

  //just in case
  router.get('*',function(req,res,next){
     res.send(`unhandled api method "${req.path}"`);
  });

  return router;
}
