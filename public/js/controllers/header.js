'use strict';
angular.module('SwarmCT')
    .controller('HeaderCtrl', function($scope, $location, $window, $auth){
      var ctrl = this;
      ctrl.isActive = isActive;
      ctrl.isAuthenticated = isAuthenticated;
      ctrl.logout = logout;

      function isActive(viewLocation) {
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
