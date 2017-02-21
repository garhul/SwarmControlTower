'use strict';
angular.module('SwarmCT').directive( 'control', function ( $compile ) {
   var controls = {};
   controls.colorWheel = {'tpl':'<colorWheel/>'};
   controls.slider = {'tpl':'<slider/>'};
   
   var linker = ( scope, element, attrs) => {
    console.log(scope.type);
    element.html(controls[scope.type].tpl);

    $compile(element.contents())(scope);
  }

  return {
    restrict: 'E',
    link:linker,
    scope: { type: '=' },
    replace:true
  };
});
