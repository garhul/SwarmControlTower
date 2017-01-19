'use strict';
angular.module('SwarmCT')
    .controller('menuCtrl', function($scope, $location){


      function isActive(viewLocation) {
          return viewLocation === $location.path();
      }



    }
);
