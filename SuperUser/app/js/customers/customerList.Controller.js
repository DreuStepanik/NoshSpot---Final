(function() {
    'use strict';

    angular
        .module('app')
        .controller('CustomersListController', CustomersListController);

    CustomersListController.$inject = ['CustomerFactory', '$stateParams'];

    /* @ngInject */
    function CustomersListController(CustomerFactory, $stateParams) {
        var vm = this;
        vm.title = 'CustomersListController';
        vm. allCustomers = [];

        activate();

        ////////////////

        function activate() {
            CustomerFactory.getAll().then(
                function(customers){
                    vm.allCustomers = customers;
                    console.log(vm.allCustomers);
                });
        }
    }
})();