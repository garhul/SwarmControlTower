'use strict';

angular.module('SwarmCT').controller('DeviceDetailCtrl', function($scope, $injector){
  var $location = $injector.get('$location');
  var $devStore = $injector.get('DeviceStore');
  var $routeParams = $injector.get('$routeParams');

  $scope.device = {};

  $scope.controls = [
    {
      name:'Color de tira',
      type:'colorWheel',
      options: {},
    },
    {
      name:'Luces oficina',
      type:'slider',
      options: {},
    }
  ];

  $scope.$on('color.changed',(data)=>{
    console.info(data);
  });

  var init = function() {
    //ask for controls for this device to the device store
    $devStore.init().then(()=>{
      $scope.device = $devStore.getDevice($routeParams.id);
      console.log($scope.device);
    });

  }

  init();

});
