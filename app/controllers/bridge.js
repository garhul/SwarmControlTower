'use strict';

module.exports = function(bridge) {
  /** what's the status? **/
  function status(req,res, next){
    res.header('content',"application/json").status("200").send(bridge.isConnected());
  }

  return {
    status:status
  }
}
