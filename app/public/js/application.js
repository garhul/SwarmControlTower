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
      .when('/devices', {
        templateUrl: 'views/partials/devices.html',
        controller: 'DevicesCtrl'
      })
      .when('/devices/:id', {
        templateUrl: 'views/partials/device_detail.html',
        controller: 'DeviceDetailCtrl',
        reloadOnSearch: false
      })
      .when('/devices/:id/:tab', {
        templateUrl: 'views/partials/device_detail.html',
        controller: 'DeviceDetailCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/partials/settings.html',
        controller: 'SettingsCtrl',
      });
      // .otherwise({
      //    redirectTo:'/404.html',
      //    templateUrl: '/js/partials/404.html'
      // });
  })
  .run(function($rootScope, $timeout, Bridge, $location ,$route) {
    //initialize data store for devices

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };


    //check bridge status
    var checkBridge = function() {
      Bridge.status((res) => {
        $rootScope.isBridgeConnected = res.connected;
        $timeout(checkBridge, 10000);
      },
        (err) => {
          console.log(err);
          $timeout(checkBridge, 10000);
        });
      }
    checkBridge();

  });

})();
