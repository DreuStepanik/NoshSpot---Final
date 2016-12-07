(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', 'RestaurantFactory', '$state'];

    function RestaurantDetailController($stateParams, RestaurantFactory, $state) {
        var vm = this;

        vm.save = save;
        vm.restaurants = {};

        getRestaurantById();

/********************************************************************************************/

//Find a way to get the restaurant's ID from the login page to load up the proper details, 
//then chenge these functions around.

        function getRestaurantById() {
            if ($stateParams.restaurantId) {
               vm.restaurantId = $stateParams.restaurantId;
                
                RestaurantFactory.getById($stateParams.restaurantId).then(
                    function(restaurants) {
                        vm.restaurants = restaurants;
                    }
                );
            } else {
                vm.restaurants = {};
            }
        }

/********************************************************************************************/
       
//Change this up so that the UPDATE function is the only function called, no need to add a new restaurant.

        function save() {
            if ($stateParams.restaurantId) {
                vm.restaurants.restaurantId = $stateParams.restaurantId;
                RestaurantFactory.update(vm.restaurants, $stateParams.restaurantId).then(
                    function() {
                        alert("Update was successful!")
                    }
                );
          } else {
            RestaurantFactory.add(vm.restaurants).then(
                function() {
                    alert("Add was successful!")   
                }
            );
          } 
        }
    }
})();