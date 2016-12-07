(function() {
    'use strict';

    angular
        .module('module')
        .controller('CustomerListController', CustomerListController);

    CustomerListController.$inject = ['CustomerFactory'];

    /* @ngInject */
    function CustomerListController(CustomerFactory) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }
})();