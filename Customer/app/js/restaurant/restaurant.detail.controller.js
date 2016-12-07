(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', '$state', 'restaurantFactory', 'OrderFactory', 'OrderItemFactory', 'StripePaymentFactory', 'reviewFactory'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, $state, restaurantFactory, OrderFactory, OrderItemFactory, StripePaymentFactory, reviewFactory) {
        var vm = this;
        vm.title = 'restaurantDetailController';
        
        // variables
        vm.menu = {};
        vm.newReviewDescription = "";
        vm.newReviewRating;        
        vm.restaurantId = $stateParams.restaurantId;
        vm.customerId = $stateParams.customerId;

        // functions
        vm.addReview = addReview;
        vm.addToCart = addToCart;
        vm.removeItem = removeItem;
        vm.doCheckout = doCheckout;
        
        getMenu();

        ////////////////

        function getMenu() {
            restaurantFactory.getById($stateParams.restaurantId).then(
            function(response) {
                vm.menu = response;
                vm.cart = {
                    cost: function() {
                        if(vm.cart.items.length) {
                            return vm.cart.items.map(function(item) {
                                return item.price;
                            }).reduce(function(previousPrice, currentPrice) {
                                return previousPrice + currentPrice;
                            });
                        } else {
                            return 0;
                        }
                    },
                    items: []
                };
            },
            function(error){
            console.log(error);
            }
            );
        }

        ////////////////

        function addToCart(item) {
            vm.cart.items.push(angular.copy(item));
        }

        ////////////////

        function addReview () {
            vm.newReview = {
                customerId: vm.customerId,
                restaurantId: $stateParams.restaurantId,
                reviewDescription: vm.newReviewDescription,
                rating: vm.newReviewRating
            };
            reviewFactory.add(vm.newReview).then(
                function(){
                    alert('Review added');
                    getMenu();
                    console.log(vm.newReview);
            });
        }

        function removeItem(item) {
            var index = vm.cart.items.indexOf(item);
            vm.cart.items.splice(index, 1);
        }

        function doCheckout(token) {
            // create order in database
            // create order items in database
            // pay in stripe
            // add payment to database
            var order = {
                restaurantId: $stateParams.restaurantId,
                customerId: $stateParams.customerId,
                timeStamp: new Date()
            };

            OrderFactory.add(order).then(function(data) {
                for(var i = 0; i < vm.cart.items.length; i++) {
                    var item = vm.cart.items[i];

                    var orderItem = {
                        menuItemId: item.menuItemId,
                        orderId: data.orderId
                    };
                    OrderItemFactory.add(orderItem);
                }

                var payInfo = {
                    "token": token.id,
                    "orderAmount": parseInt(vm.cart.cost() * 100),
                    "description": vm.menu.name
                };

                StripePaymentFactory.add(payInfo)
                    .then(function(stripePaymentData){
                        vm.allRestaurants = data;
                        console.log(vm.allRestaurants);
                        PaymentFactory.add({
                            orderId: data.orderId,
                            customerId: $stateParams.customerId,
                            paymentDate: new Date(),
                            paymentAmount: stripePaymentData.amount
                        });
                     },
                     function(error){
                        console.log(error);
                     }
                );
            });
        }
    }
})();

// function removeItem(item) {
//             vm.cart.items.splice(indexOf(item), 1);
//         }