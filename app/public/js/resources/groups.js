angular
  .module('SwarmCT')
  .factory('Groups', function ($resource) {
    return $resource('/api','', {
      list: {
        method: 'GET',
        url: '/api/groups',
        isArray:true
      },
      add: {
        method:  "POST",
        url:  '/api/groups'
      } });
  });
