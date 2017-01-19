'use strict';

angular.module('SwarmCT').controller('DashboardCtrl', function($scope, $injector){
  var Groups = $injector.get('Groups');
  var $location = $injector.get('$location');

  var init = function(){
    //load groups
    Groups.list(function(res){
      $scope.groups = res;
    },function(err){
      console.error(err);
    });

  }

  $scope.showGroup = function(name){
    $location.path('/groups/'+name);
  }

  $scope.teststuff = function() {
    console.log($scope.test);
  }

  init();
  
});
