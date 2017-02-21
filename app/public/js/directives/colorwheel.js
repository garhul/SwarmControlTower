'use strict';
angular.module('SwarmCT')
.directive('colorwheel', function($compile) {

  return {
    restrict: 'E',
    scope: { opts: '=' },
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
          console.log(e.target.getAttribute('val'));
          scope.$emit('color.changed',{"val":e.target.getAttribute('val')});
        });

        element[0].children[0].appendChild(color);
      };
    }
  };
});
