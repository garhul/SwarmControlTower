'use strict';
angular.module('SwarmCT').directive( 'control', function ( $compile ) {
   var controls = {};
   controls.colorWheel = {'tpl':'<colorWheel cfg=cfg />'};
   controls.slider = {'tpl':'<slider cfg=cfg />'};

   var linker = ( scope, element, attrs) => {
    element.html(controls[scope.type].tpl);

    $compile(element.contents())(scope);
  }

  return {
    restrict: 'E',
    link:linker,
    scope: { type: '=', cfg:'='},
    replace:true
  };
});
