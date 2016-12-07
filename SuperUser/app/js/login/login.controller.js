(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams'];

    /* @ngInject */
    function LoginController($state,  $stateParams) {
        var vm = this;
        vm.title = 'LoginController';
        vm.loginInfo = {};
        vm.loginAdmin = loginAdmin;

        ////////////////

        function loginAdmin() {
          //confirm credentials
          if (vm.loginInfo.password === "butts"){
            //route to restaurants.list
            $state.go('restaurants.list');
          }
          else
          {
            alert("You didn't enter the correct password.");
          }
        }
    }
})();