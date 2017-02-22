'use strict';
angular.module('SwarmCT')
.directive('slider', function($compile) {

  return {
    restrict: 'E',
    scope: { cfg: '=' },
    templateUrl:'views/partials/controls/slider_simple.html',
    replace:true,
    link:(scope, element, attrs) => {
      element.children()[0].addEventListener('change',(e) => {

        scope.$emit('control.changed',{ "value" : scope.slide, "cmd": scope.cfg.cmd ,"serviceId": scope.cfg.serviceId});
      });
    }
  };
});
