(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr'])
        .value('apiUrl', 'http://localhost:61815/api')
        .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appConfig($urlRouterProvider, $stateProvider) {

    	$urlRouterProvider.otherwise('/login');

/*************LOGIN STATE**************************************************************/
    	$stateProvider
    	.state('login', {
    		url: '/login',
    		controller: 'LoginController as login',
    		templateUrl: 'js/login/login.html'
    	})
/*************RESTAURANT STATES**************************************************************/
		.state('restaurant', {
			url: '/restaurant',
			abstract: true,
			template: '<div ui-view></div>'
		})
			.state('restaurant.detail', {
				url: '/detail?restaurantId',
				controller: 'RestaurantDetailController as restaurantDetail',
				templateUrl: 'js/details/details.html'
			})
/*************RESTAURANT DETAIL/TABS STATES**************************************************************/
				.state('restaurant.detail.tabs', {
					url: '/tabs',
					abstract: true,
					template: '<div ui-view></div>'
				})
					.state('restaurant.detail.tabs.menu', {
						url: '/menu',
						controller: 'RestaurantMenuController as restaurantMenu',
						templateUrl: 'js/menu/menu.html'
					})
					.state('restaurant.detail.tabs.orders', {
						url: '/orders',
						controller: 'RestaurantOrdersController as restaurantOrders',
						templateUrl: 'js/orders/orders.html'
					})
					.state('restaurant.detail.tabs.reviews', {
						url: '/reviews',
						controller: 'RestaurantReviewsController as restaurantReviews',
						templateUrl: 'js/reviews/reviews.html'
					})
	}
})();