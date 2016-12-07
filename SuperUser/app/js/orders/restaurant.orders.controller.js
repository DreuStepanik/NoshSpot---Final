(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailOrdersController', RestaurantDetailOrdersController);

    RestaurantDetailOrdersController.$inject = ['RestaurantFactory', '$stateParams'];

    /* @ngInject */
    function RestaurantDetailOrdersController(RestaurantFactory, $stateParams) {
        var vm = this;

        vm.getTotal = getTotal;
        /////////////////////
        activate();
        /////////////////////


        function activate() {
             if ($stateParams.restaurantId) {
                RestaurantFactory.getById($stateParams.restaurantId).then(function(data) {
                    vm.details = data;
                });
             } else {
                vm.details = {};
            }
        }
        
        function getTotal(order) {
            var sum = 0;

            for(var i = 0; i < order.orderItems.length; i++) {
                sum += order.orderItems[i].menuItem.price;
            }

            return sum;
        }

    }
})();
