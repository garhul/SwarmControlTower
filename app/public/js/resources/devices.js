angular
  .module('SwarmCT')
  .factory('Devices', function ($resource) {
    return $resource('/api','', {
      list: {
        method: 'GET',
        url: '/api/devices'
      },
      update: {
        method: "PUT",
        url:'/api/devices/:id'
      },
      remove: {
        method: "DELETE",
        url:'/api/devices/:id'        
      },
      add: {
        method:  "POST",
        url:  '/api/devices'
      } });
  });
