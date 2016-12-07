(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantReviewsController', RestaurantReviewsController);

    RestaurantReviewsController.$inject = ['RestaurantFactory', '$stateParams'];

    /* @ngInject */
    function RestaurantReviewsController(RestaurantFactory, $stateParams) {
        var vm = this;
        vm.reviews = [];
        ////////////////
        activate();
        ////////////////

        function activate() {
            RestaurantFactory.getById($stateParams.restaurantId).then(
                function(data) {
                    vm.reviews = data;
                    console.log(vm.reviews);
                }
            );
        }
    }
})();