'use strict';
angular.module('SwarmCT')
.directive('colorwheel', function($compile) {

  return {
    restrict: 'E',
    scope: { cfg: '=' },
    templateUrl: 'views/partials/controls/colorwheel.html',//'<span class="colorwheel"></span>',
    replace:true,
    link:(scope, element, attrs) => {

      function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        color = '#' + parts.join('');

        return color;
      }

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
          var value = hexc(e.target.style.backgroundColor);
          scope.$emit('control.changed',{ "value" : value, "cmd": scope.cfg.cmd, "serviceId":scope.cfg.serviceId  });
        });

        element[0].children[0].appendChild(color);
      };
    }
  };
});
