(function(){
	'use strict';

	angular
		.module('app')
		.controller('RestaurantListController', RestaurantListController);

	RestaurantListController.$inject = ['$stateParams', 'RestaurantFactory'];

	function RestaurantListController($stateParams, RestaurantFactory){
		var vm = this;

		vm.allRestaurants = [];
		vm.restaurantId = $stateParams.restaurantId;
		vm.removeRestaurant = removeRestaurant;
		getAllRestaurants();

/*************************************************************************/
		function getAllRestaurants(){
			RestaurantFactory.getAll()
							 .then(function(data){
							 	vm.allRestaurants = data;
							 	console.log(vm.allRestaurants);
							 },
							 function(error){

							 }
						);
		}	
/*************************************************************************/
		function removeRestaurant(restaurant){
			if (confirm("Are you sure you want to remove this restaurant?")){
				RestaurantFactory.remove(restaurant.restaurantId).then(
					function(){
						var index = vm.allRestaurants.indexOf(restaurant);
						vm.allRestaurants.splice(index, 1);
						console.log("Removed");
					}
				);
			}
			
		}
	}


})();