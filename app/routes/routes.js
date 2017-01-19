'use strict';
var express = require('express');
var router = express.Router();
var groups = require('../controllers/groups');
var devices = require('../controllers/devices');
var bridge = require('../controllers/bridge');

//set the accept headers for the api routes
 router.use(function(req,res,next){
   req.headers.accept = 'application/json';
   next();
});

//groups api
router.get('/groups',
  groups.get
);

router.put('/groups',
  groups.update
);

router.delete('/groups',
  groups.remove
);

//bridge api
router.get('/bridge', bridge.status);

//devices api
router.get('/devices', devices.list);

//settings api


//just in case
router.get('*',function(req,res,next){
   res.send(`unhandled api method "${req.path}"`);
});

module.exports = router;
