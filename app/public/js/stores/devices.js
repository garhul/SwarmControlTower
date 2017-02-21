angular
  .module('SwarmCT')
  .factory('DeviceStore', function $session($rootScope, $injector) {

    var $Devices = $injector.get('Devices');
    var data = null;

    var init = function() {
      return load();
    };

    var load = function() {
      return $Devices.list(
        (rsp) => {
          data = rsp.data;
        },(err) => {
          console.warn(err);
        }).$promise;
    };

    var getDevice = function(id) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].id, id);
        if (data[i].id === id)
          return data[i];
      }
      return null;
    }

    var list = function(){};

    return {
      init: init,
      getDevice:getDevice,
      list:list,
      data: data
    }
  });
