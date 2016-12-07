(function() {
  'use strict';

  angular
    .module('app')
    .factory('CRUDFactory', CRUDFactory);

  CRUDFactory.$inject = ['$http', '$q'];

  /* @ngInject */
  function CRUDFactory($http, $q) {
    return function(endpoint, entityName) {
      var service = {
        getAll: getAll,
        getById: getById,
        add: add,
        update: update,
        remove: remove
      };

      return service;

      ////////////////

      function getAll() {
        var deferred = $q.defer();

        $http.get(endpoint)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(error) {
            console.log(error);
            deferred.reject('There was a problem fetching ' + entityName.toLowerCase() + 's.');
          });

        return deferred.promise;
      }

      function getById(id) {
        var deferred = $q.defer();

        $http.get(endpoint + '/' + id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(error) {
            console.log(error);
            deferred.reject('There was a problem fetching that ' + entityName.toLowerCase() + '.');
          });

        return deferred.promise;
      }

      function add(entity) {
        var deferred = $q.defer();

        $http.post(endpoint, entity)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(error) {
            deferred.reject('There was a problem creating that ' + entityName.toLowerCase() + '.');
          });

        return deferred.promise;
      }

      // this function requires that you pass in an id
      // so that we don't have to do any trickery to get
      // the entity id
      function update(entity, id) {
        var deferred = $q.defer();

        $http.put(endpoint + '/' + id, entity)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(error) {
            deferred.reject('There was a problem updating this ' + entityName.toLowerCase() + '.');
          });

        return deferred.promise;
      }

      function remove(id) {
        var deferred = $q.defer();

        $http.delete(endpoint + '/' + id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(error) {
            deferred.reject('There was a problem deleting that ' + entityName.toLowerCase() + '.');
          });

        return deferred.promise;
      }
    };
  }
})();