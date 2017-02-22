'use strict';
angular.module('SwarmCT')
.directive('colorwheel', function($compile) {

  return {
    restrict: 'E',
    scope: { cfg: '=' },
    templateUrl: 'views/partials/controls/colorwheel.html',//'<span class="colorwheel"></span>',
    replace:true,
    link:(scope, element, attrs) => {
      for (var i=0; i < 360; i+=4) {
      	var color = document.createElement("span");
  			color.setAttribute("val", "h" + i);
  			color.style.backgroundColor = "hsl(" + i + ", 100%, 50%)";
  			color.style.msTransform = "rotate(" + i + "deg)";
  			color.style.webkitTransform = "rotate(" + i + "deg)";
  			color.style.MozTransform = "rotate(" + i + "deg)";
  			color.style.OTransform = "rotate(" + i + "deg)";
  			color.style.transform = "rotate(" + i + "deg)";

        color.addEventListener('mousedown',(e) => {
          scope.$emit('control.changed',{ "value" : e.target.getAttribute('val'), "cmd": scope.cfg.cmd, "serviceId":scope.cfg.serviceId  });
        });

        element[0].children[0].appendChild(color);
      };
    }
  };
});
