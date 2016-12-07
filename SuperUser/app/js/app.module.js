(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr', 'uiRouterStyles'])
        .value('apiUrl', 'http://localhost:61815/api' )
        .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
    

    function appConfig($urlRouterProvider, $stateProvider) {

    	$urlRouterProvider.otherwise('/login');
    
    	$stateProvider
    	.state('login', {
    		url: '/login',
    		controller: 'LoginController as login',
    		templateUrl: 'js/login/login.html',
            data: {
               css: 'css/login.css'
            }

    	})
/////// RESTAURANT STATES ////////////////////////////////////////////
    	.state('restaurants', {
    		url: '/restaurants', 
    		abstract: true, 
    		template: '<div ui-view></div>'
    	})
    		.state('restaurants.list', {
    			url: '/list',
    			controller: 'RestaurantListController as restaurantList',
    			templateUrl: 'js/restaurants/list.html',
                data: {
                    css: 'css/custom.css'
            }
    		})
    		.state('restaurants.detail', {
    			url: '/detail?restaurantId',
    			controller: 'RestaurantDetailController as restaurantDetail',
    			templateUrl: 'js/restaurants/detail.html',
                data: {
                    css: 'css/custom.css'
            }
    		})
    			.state('restaurants.detail.tabs', {
    				url: '/tabs',
    				abstract: true,
    				template: '<div ui-view></div>'
    			})
    				.state('restaurants.detail.tabs.menu', {
    					url: '/menu',
    					controller: 'RestaurantDetailMenuController as restaurantDetailMenu',
    					templateUrl: 'js/menu/menu.html',
                        data: {
                            css: 'css/custom.css'
                    }
    				})
    				.state('restaurants.detail.tabs.orders', {
    					url: '/orders',
    					controller: 'RestaurantDetailOrdersController as restaurantDetailOrders',
    					templateUrl: 'js/orders/orders.html',
                        data: {
                            css: 'css/custom.css'
                    }
    				})
    				.state('restaurants.detail.tabs.reviews', {
    					url: '/reviews',
    					controller: 'RestaurantDetailReviewsController as restaurantDetailReviews',
    					templateUrl: 'js/reviews/reviews.html',
                        data: {
                            css: 'css/custom.css'
                    }
    				})
/////// CUSTOMERS STATES ////////////////////////////////////////////
		.state('customers', {
			url: '/customers',
			abstract: true,
			template: '<div ui-view></div>'
		})
			.state('customers.list', {
				url: '/list',
				controller: 'CustomersListController as customersList',
				templateUrl: 'js/customers/list.html',
                data: {
                    css: 'css/custom.css'
            }
			})
			.state('customers.detail', {
				url: '/detail?customerId',
				controller: 'CustomerDetailController as customerDetail',
				templateUrl: 'js/customers/detail.html',
                data: {
                    css: 'css/custom.css'
            }
			});
    }   
})();