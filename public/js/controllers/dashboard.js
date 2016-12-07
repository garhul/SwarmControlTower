'use strict';

angular.module('SwarmCT').controller('DashboardCtrl', function($scope, $injector){
  var Groups = $injector.get('Groups');
  var $location = $injector.get('$location');


  var init = function(){
    console.log("started up dashboard ctrl");

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

  init();
});
