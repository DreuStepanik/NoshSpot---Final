(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['RestaurantFactory', '$state', '$stateParams'];

    /* @ngInject */
    function LoginController(RestaurantFactory, $state, $stateParams) {
        var vm = this;
        vm.title = 'LoginController';
        vm.loginInfo = {};
        vm.loginRestaurant = loginRestaurant;

        ////////////////
        activate();
        ////////////////

        function activate() {
            RestaurantFactory.getAll().then(function(data) {
                vm.restaurants = data;
            });

            vm.selectedRestaurant = null;
        }

        function loginRestaurant() {
        	if (vm.loginInfo.password != 'butts' || vm.selectedRestaurant === null) {
        		alert('the password is butts, make sure you select a restaurant also');
        	}
        	else
        	{
        		$state.go("restaurant.detail.tabs.menu", {"restaurantId": vm.selectedRestaurant});
        	}
        }
    }
})();