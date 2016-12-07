(function() {
    'use strict'

    angular
        .module('app')
        .controller('OrdersController', OrdersController);

    OrdersController.$inject = ['$stateParams', 'customerFactory', 'reviewFactory', 'StripePaymentFactory', 'StripeCheckout', '$timeout'];

    function OrdersController($stateParams, customerFactory, reviewFactory, StripePaymentFactory, StripeCheckout, $timeout) {
        var vm = this;

        var stripeCheckoutHandler;

        // function
        vm.allOrders = allOrders;
        vm.doCheckout = doCheckout;

        // variables
        vm.customerId = $stateParams.customerId;
        vm.details;

        allOrders();

        StripeCheckout.load().then(function() {
            stripeCheckoutHandler = StripeCheckout.configure({
                name: "NoshSpot",
                token: function(token, args) {
                	console.log(token, args);

                    var payInfo = {
                        "token": token.id,
                        "orderAmount": parseInt(vm.selectedOrder.orderTotal * 100),
                        "description": vm.selectedOrder.restaurant.name
                    };

                    StripePaymentFactory.add(payInfo).then(
                        function(data) {
                            console.log(data);
                            PaymentFactory.add(
                            {
                               orderId: data.orderId,
                               customerId: $stateParams.customerId,
                               paymentDate: new Date(),
                               paymentAmount: stripePaymentData.amount
                            });

                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                }
            });
        });

        // Get orders for customer
        function allOrders() {
            customerFactory.getById(vm.customerId).then(
                function(data) {
                    vm.details = data;
                    console.log(vm.details);
                }
            );
        }

        // Buy order again using stripe
        function doCheckout(order) {
            vm.selectedOrder = order;

            stripeCheckoutHandler.open({
                name: "NoshSpot",
                description: "NoshSpot Food Order",
                amount: parseInt(order.orderTotal * 100)
            });
        }
    }
})();
