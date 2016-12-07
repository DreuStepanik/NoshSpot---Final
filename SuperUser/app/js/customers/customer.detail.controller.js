(function() {
    'use strict';

    angular
        .module('app')
        .controller('CustomerDetailController', CustomerDetailController);

    CustomerDetailController.$inject = ['$stateParams', 'CustomerFactory', 'ReviewFactory', 'toastr'];

    /* @ngInject */
    function CustomerDetailController($stateParams, CustomerFactory, ReviewFactory, toastr) {

        var vm = this;
        vm.title = 'CustomerDetailController';

        // variables
        vm.customerId = $stateParams.customerId;
        vm.customer;
        vm.reviewMode = true;

        // functions
        vm.deleteCustomer = deleteCustomer;
        vm.getCustomerById = getCustomerById;
        vm.sumOrder = sumOrder;
        vm.removeReview = removeReview;

        activate();

        ////////////////

        function activate() {
            getCustomerById(vm.customerId);
        }

        function deleteCustomer(id) {
            CustomerFactory.remove(id).then (
                function(response) {
                    toastr.success("Customer successfully deleted.");
                    vm.customer = {};
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                }
            );
        }

        function getCustomerById(id) {
            CustomerFactory.getById(id).then (
                function(data) {
                    vm.customer = data;
                    console.log(data);
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                }
            );
        }

        function sumOrder(order) {
            var sum = 0;
            var orderItemLength = order.orderItems.length;
            
            for (var i = 0; i < orderItemLength; i++) {
                sum += order.orderItems[i].menuItem.price;
            }

            return sum;
        }

        function removeReview(review) {
            if (confirm("Are you sure you want to remove this review?")) {
                ReviewFactory.remove(review.reviewId).then (
                    function(data) {
                        var index = vm.customer.reviews.indexOf(review);
                        vm.customer.reviews.splice(index, 1);
                        console.log("Removed review successfully");
                    }
                );
            }
        }

    }
})();