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

  $scope.delete = (id) => {
    // TODO:: make it fancy
    if (confirm("delete it really?")) {
      Devices.remove({"id":id}).$promise.then((rsp)=>{
        console.info(rsp.data);
      },(err)=>{
        console.warn(err);
      });
    }
  }

  function loadDevices() {
    Devices.list().$promise.then((rsp) => {
      $scope.devices.data = rsp.data;
    },(err) => {
      //todo:: alert the user about the problem
      console.warn(err);
    });
  }

  loadDevices();
});
