(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', 'CategoryFactory', 'RestaurantFactory', '$state', 'toastr'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, CategoryFactory, RestaurantFactory, $state, toastr) {
        var vm = this;
        vm.title = 'RestaurantDetailController';

        //functions
        vm.save = save;
        vm.getCategories = getCategories;
        vm.getRestaurantById = getRestaurantById;
        vm.addCategory = addCategory;
        vm.deleteRestaurant = deleteRestaurant;

        //variables
        vm.restaurants = {};
        vm.newCategory = {};
        vm.categories;


        activate();

        ////////////////

        function activate() {
            getRestaurantById();
            getCategories();
        }


         function deleteRestaurant(id) {
            RestaurantFactory.remove(id).then (
                function(response) {
                    console.log(response);
                    toastr.success("Restaurant successfully deleted.");
                    vm.restaurants = {};
                }
            );
        }

        function getCategories() {
            CategoryFactory.getAll().then (
                function(data) {
                    vm.categories = data;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                }
            );
        }

        function getRestaurantById() {
        	// If the page loads, and the existing restaurant is already paired with an Id, then continue the request with that specified restaurant.
            if ($stateParams.restaurantId) {
               vm.restaurantId = $stateParams.restaurantId;
                
                RestaurantFactory.getById($stateParams.restaurantId).then(
                    function(restaurants) {
                        console.log(restaurants);
                        // With an exisiting Id, the vm.restaurants value will be equal to an existing restaurant.
                        vm.restaurants = restaurants;
                    }
                );
            } else {
                // If the restaurant was not already in the system, then vm.restaurants value will be equal to the user's input. 
                // After being created, a restaurant Id will be assigned to the database to be called upon.
                vm.restaurants = {};
            }
        }

        function addCategory() {
            CategoryFactory.add(vm.newCategory).then(function(data) {
                getCategories();
                vm.restaurants.categoryId = data.categoryId;
            });
        }

        function save() {
            // If the page loads, and the existing restaurant is already paired with an Id, then continue with the request with that specified restaurant.
            if ($stateParams.restaurantId) {
                // vm.restaurants.category = null;
                // Call the current restaurant information, to be updated.
                RestaurantFactory.update(vm.restaurants, vm.restaurants.restaurantId).then(
                    function() {
                        toastr.success("Update was successful!");
                    }
                );
          } else {
            // If the restaurant was not already in the system, 'add' a new restaurant value for the vm.restaurants item. 
            RestaurantFactory.add(vm.restaurants).then(
                function() {
                    // Save + create was successful.
                    toastr.success("Add was successful!");
                    $state.go('restaurants.list');
                }
            );
          } 
        }
    }
})();