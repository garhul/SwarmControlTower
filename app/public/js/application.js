(function() {
angular.module('SwarmCT', ['ngRoute','ngResource'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/groups/:name', {
        templateUrl: 'views/partials/group.html',
        controller:'GroupCtrl'
      })
      .when('/device', {
        templateUrl: 'views/partials/devices.html',
        controller: 'devicesCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/partials/settings.html',
        controller: 'SettingsCtrl',
      })
      .otherwise({
         redirectTo:'/404.html'
         templateUrl: '/js/partials/404.html'
      });
  })
})();
