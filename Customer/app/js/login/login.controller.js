(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams', 'customerFactory'];

    /* @ngInject */
    function LoginController($state, $stateParams, customerFactory) {
        var vm = this;
        vm.title = 'LoginController';
        vm.loginInfo = {};
        vm.customers;
        vm.newCustomer = {};
        vm.expand = false;

        vm.loginCustomer = loginCustomer;
        vm.addNewCustomer = addNewCustomer;

        allCustomers();
        ////////////////

        function allCustomers() {
            customerFactory.getAll().then(
                function(data){
                    vm.customers = data;
                }
            );
        }

        function addNewCustomer(newCustomer){
            if (vm.password === vm.confirmPassword) {
                customerFactory.add(newCustomer).then(
                    function(data){
                        console.log(data);
                        $state.go('restaurants.list', {customerId: data.customerId});
                    },
                    function(error){
                        console.log(error);
                    }
                );
            }
            else {
                alert("Passwords do not match");
            }
        }

        function loginCustomer() {
        	if(vm.loginInfo.password != 'butts') {
        		alert("You entered the wrong password");
        	}
        	else
        	{
        		$state.go('restaurants.list', {customerId: vm.selectedCustomer});
        	}
        }
    }
})();