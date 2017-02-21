'use strict';
angular.module('SwarmCT')
.directive('slider', function($compile) {

  return {
    restrict: 'E',
    scope: { opts: '=' },
    templateUrl:'views/partials/controls/slider_simple.html',
    replace:true,
    link:(scope, element, attrs) => {

    }
  };
});
