(function() {
  'use strict';

  angular
    .module('app')
    .factory('MenuItemFactory', MenuItemFactory);

  MenuItemFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function MenuItemFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/menuItems', 'menuItem');
  }
})();