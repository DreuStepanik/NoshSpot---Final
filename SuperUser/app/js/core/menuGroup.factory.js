(function() {
  'use strict';

  angular
    .module('app')
    .factory('MenuGroupFactory', MenuGroupFactory);

  MenuGroupFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function MenuGroupFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/menuGroups', 'menuGroup');
  }
})();