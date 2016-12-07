(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantOrdersController', RestaurantOrdersController);

    RestaurantOrdersController.$inject = ['$state', '$stateParams', 'RestaurantFactory', 'OrderFactory'];

    /* @ngInject */
    function RestaurantOrdersController($state, $stateParams, RestaurantFactory, OrderFactory) {
        var vm = this;
        
        vm.getTotal = getTotal;
        vm.getOrderById = getOrderById;

        activate();

        function activate() {
        	if ($stateParams.restaurantId) {
        		RestaurantFactory.getById($stateParams.restaurantId).then(
        			function(data) {
        				vm.details = data;
                        console.log(vm.details);
        			}
        		);
        	}
        	else
        	{
        		vm.details = {};
        	}
        }

        function getTotal(food) {
        	var sum = 0;

        	for(var i = 0; i < food.orderItems.length; i++) {
        		sum += food.orderItems[i].menuItem.price;
        	}
        }

        function getOrderById(orderId, $index) {
            OrderFactory.getById(orderId).then(
                function(data) {
                        vm.orders = data;
                        vm.orders.totalPrice = vm.details.orders[$index].totalPrice;
                        console.log(vm.orders);
                    
                }
            );
            
            
        } 
    }
})();