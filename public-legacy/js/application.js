(function() {
angular.module('SwarmCT', ['ngRoute','ngResource'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/js/partials/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/groups/:name', {
        templateUrl: '/js/partials/group.html',
        controller:'GroupCtrl'
      });
      // .when('/device', {
      //   templateUrl: 'partials/devices.html',
      //   controller: 'devicesCtrl'
      // })
      // .when('/settings', {
      //   templateUrl: 'partials/settings.html',
      //   controller: 'SettingsCtrl',
      // })
      // .otherwise({
      //   templateUrl: '/js/partials/404.html'
      // });
  })
})();
