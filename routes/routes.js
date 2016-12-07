'use strict';
var express = require('express');
var router = express.Router();
var groups = require('../controllers/groups');

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

//devices api


//settings api


//just in case
router.get('*',function(req,res,next){
   res.send(`unhandled api method "${req.path}"`);
});

module.exports = router;
