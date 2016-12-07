(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr', 'stripe.checkout'])
        .value('apiUrl', 'http://localhost:61815/api')
        .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'StripeCheckoutProvider'];

    function appConfig($urlRouterProvider, $stateProvider, StripeCheckoutProvider) {

        StripeCheckoutProvider.defaults({
            key: 'pk_test_XE4OKSyJR5b8YXIX41XXEsN6'
        });

    	$urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('restaurants', {
                url: '/restaurants',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('restaurants.list', {
                url: '/list?customerId',
                controller: 'RestaurantListController as restaurantList',
                templateUrl: 'js/restaurant/restaurantList.html'
            })
            .state('restaurants.detail', {
                url: '/detail?restaurantId?customerId',
                controller: 'RestaurantDetailController as restaurantDetail',
                templateUrl: 'js/restaurant/restaurant.detail.html' //Make sure this works
            })
            .state('login', {
                url: '/login',
                controller: 'LoginController as login',
                templateUrl: 'js/login/login.html'
            })
            .state('orders', {
                url: '/orders?customerId', 
                controller: 'OrdersController as orders',
                templateUrl: 'js/orders/orders.html'
            });
            
    }

})();
