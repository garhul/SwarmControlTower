'use strict';
angular.module('SwarmCT')
    .controller('menuCtrl', function($scope, $location, $window){
      var ctrl = this;
      ctrl.isActive = isActive;
      ctrl.isAuthenticated = isAuthenticated;
      ctrl.logout = logout;

      function isActive(viewLocation) {
          console.log($location.path);
          return viewLocation === $location.path();
      }

      function isAuthenticated() {
          return $auth.isAuthenticated();
      }

      function logout() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
      }
    }
);
