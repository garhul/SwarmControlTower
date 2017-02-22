'use strict';

angular.module('SwarmCT').controller('DeviceDetailCtrl', function($scope, $injector){
  var $location = $injector.get('$location');
  var $devStore = $injector.get('DeviceStore');
  var $routeParams = $injector.get('$routeParams');

  $scope.activeTab = false;
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

  $scope.$on('color.changed',(data) => {
    console.info(data);
  });

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



  }

  init();

});
