'use strict';

/** what's the status? **/
function status(req,res, next){
  res.header('content',"application/json").status("200").send({connected:req.app.get('bridge').isConnected});
}

module.exports = {
  status:status
}
