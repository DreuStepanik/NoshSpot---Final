(function(){
	'use strict';

	angular
		.module('app')
		.controller('RestaurantListController', RestaurantListController);

	RestaurantListController.$inject = ['$stateParams', 'restaurantFactory', 'customerFactory'];

	function RestaurantListController($stateParams, restaurantFactory, customerFactory){
		var vm = this;

		vm.allRestaurants = [];
		vm.customer = {};
		vm.restaurantId = $stateParams.restaurantId;
		vm.customerId = $stateParams.customerId;

		getAllRestaurants();
		getCustomerInfo();

        function getCustomerInfo() {
        	if ($stateParams.customerId) {
        		customerFactory.getById($stateParams.customerId).then(
        			function(data) {
        				vm.customer = data;
                        console.log(vm.customer);
        			}
        		);
        	}
        	else
        	{
        		vm.customer = {};
        	}
        }

		function getAllRestaurants(){
			restaurantFactory.getAll().then(
				function(data){
					vm.allRestaurants = data;
					console.log(vm.allRestaurants);
				},
				function(error){
					console.log(error);
				}
			);
		}	
	}
})();
