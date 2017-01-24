'use strict';
angular.module('SwarmCT').controller('DevicesCtrl', function($scope, $injector,$routeParams){
  var Devices = $injector.get('Devices');
  var $location = $injector.get('$location');

  $scope.viewAs = 'ITEM';
  $scope.devices = {};
  $scope.devices.loading = true;
  $scope.devices.data = [];
  $scope.locked = true;

  $scope.filterDevices = () => {
    console.log($scope.filter);
  }

  $scope.showDevice = (deviceId) => {
    $location.path('/devices/' + deviceId);
  }

  function loadDevices() {
    Devices.list().$promise.then((data) => {
      $scope.devices.data = data;
      console.log($scope.devices.data );
    },(err) => {
      //todo:: alert the user about the problem
      console.warn(err);
    });
  }


  loadDevices();
});
