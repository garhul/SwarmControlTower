'use strict';

angular.module('SwarmCT').controller('DeviceDetailCtrl', function($scope, $injector){
  var $location = $injector.get('$location');
  var $devStore = $injector.get('DeviceStore');
  var $devResource = $injector.get('Devices');
  var $routeParams = $injector.get('$routeParams');

  $scope.activeTab = false;
  $scope.device = {};

  $scope.controls = [
    {
      name:'Color de tira',
      type:'colorWheel',
      serviceId:'F2',
      config: {
        serviceId:'BF',
        cmd:'2'
      }
    },
    {
      name:'Luces oficina',
      type:'slider',
      config: {
        serviceId:'CB',
        cmd:0,
        min:0,
        max:255
      },
    }
  ];

  $scope.switchTab = (tab) => {
    $scope.activeTab = tab;
    $location.path(`/devices/${$routeParams.id}/${tab}`,false);
  }

  var init = function() {

    $scope.activeTab = $routeParams.tab || 'control';
    console.log($scope.activeTab);
    $devStore.init().then(() => {
      //ask for controls for this device to the device store
      $scope.device = $devStore.getDevice($routeParams.id);
      console.log($scope.device);
    });

    //bind controls to services
    $scope.$on('control.changed',(e,payload) => {
      console.info(e,payload);
      var data = {
        'deviceId':$scope.device.id,
        'serviceId':payload.serviceId,
        'command':payload.cmd,
        'payload':payload.value
      }

      $devResource.message(data,
        (res)=>{
          console.log(res);
        },
        (err) => {
          console.warn(err);
      });

    });

  }

  init();

});
