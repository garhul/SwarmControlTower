angular.module('SwarmCT').controller('GroupCtrl', function($scope, $injector,$routeParams){
  var Groups = $injector.get('Groups');
  var $location = $injector.get('$location');

  var init = function() {
    $scope.locked = true;
    //load a group in particular
    Groups.list(function(res) {
      res.forEach(function(i) {
        if(i.name === $routeParams.name) {
          $scope.group = i;
        }
      });
    }, function(err) {
      console.error(err);
    });
  }

  init();
});
