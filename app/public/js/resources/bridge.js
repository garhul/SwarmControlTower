angular
  .module('SwarmCT')
  .factory('Bridge', function ($resource) {
    return $resource('/api','', {
      status: {
        method: 'GET',
        url: '/api/bridge',
        isArray: false
      }
     });
  });
