angular
  .module('SwarmCT')
  .factory('Devices', function ($resource) {
    return $resource('/api','', {
      list: {
        method: 'GET',
        url: '/api/devices',
        isArray:true
      },

      add: {
        method:  "POST",
        url:  '/api/groups'
      } });
  });
