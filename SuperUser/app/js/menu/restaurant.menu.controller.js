(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailMenuController', RestaurantDetailMenuController);

    RestaurantDetailMenuController.$inject = ['MenuGroupFactory', 'MenuItemFactory', '$stateParams', 'RestaurantFactory'];

    /* @ngInject */
    function RestaurantDetailMenuController(MenuGroupFactory, MenuItemFactory, $stateParams, RestaurantFactory) {
        var vm = this;
        //properties
        vm.newMenuGroup = {};
        vm.menu = [];
       

        //methods
        vm.addMenuItem = addMenuItem;
        vm.addMenuGroup = addMenuGroup;
        vm.deleteMenuItem = deleteMenuItem;
        vm.deleteMenuGroup = deleteMenuGroup;
        vm.restaurantId = $stateParams.restaurantId;
        ////////////////
        getMenu();
        ////////////////

        function getMenu() {
            if ($stateParams.restaurantId) {
                    RestaurantFactory.getById($stateParams.restaurantId).then(
                        function(response) {
                        vm.menu = response.menuGroups;
                    }
                );
            } 
            else 
            {
                vm.menu = {};
            }
        }

        function addMenuItem(newMenuItem, menuGroupId) {
            newMenuItem.menuGroupId = menuGroupId;

                MenuItemFactory.add(newMenuItem).then(
                    function() {
                        getMenu();
                        newMenuItem = {};
                }
            );
        }

        function deleteMenuItem(menuItem) {
            if(confirm("Are you sure?")) {
                MenuItemFactory.remove(menuItem.menuItemId).then(
                    function(response) {
                        getMenu();
                    }
                );
            }
        }

        function deleteMenuGroup(menuGroup) {
            MenuGroupFactory.remove(menuGroup.menuGroupId).then(
                function() {
                    getMenu();
            });
        }

        function addMenuGroup(newMenuGroup, restaurantId) {
            vm.newMenuGroup.restaurantId = $stateParams.restaurantId;
                 MenuGroupFactory.add(vm.newMenuGroup).then(
                    function(response) {
                        toastr.success("Successfully added MenuGroup");
                        getMenu();
                        vm.newMenuGroup = {};
                }
            );
        }
    }
})();