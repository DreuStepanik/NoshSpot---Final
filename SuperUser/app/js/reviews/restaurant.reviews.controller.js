(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailReviewsController', RestaurantDetailReviewsController);

    RestaurantDetailReviewsController.$inject = ['RestaurantFactory', '$stateParams','ReviewFactory'];

    /* @ngInject */
    function RestaurantDetailReviewsController(RestaurantFactory, $stateParams, ReviewFactory) {
        var vm = this;
        vm.title = 'RestaurantDetailReviewsController';
        // vm.reviews = reviews;
        vm.removeReview = removeReview;

        activate();

        ////////////////

        function activate() {
            RestaurantFactory.getById($stateParams.restaurantId).then(function(data) {
                vm.reviews = data.reviews;
            });
        }

        function removeReview(review) {
            if (confirm("Are you sure you want to remove this Review?")) {
                ReviewFactory.remove(review.reviewId).then(
                    function() {
                        var index = vm.reviews.indexOf(review);
                        vm.reviews.splice(index, 1);
                        console.log("removed the review");
                    }
                );
            }
        }

    }
})();
