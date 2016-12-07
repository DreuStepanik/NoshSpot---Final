(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantMenuController', RestaurantMenuController);

    RestaurantMenuController.$inject = ['MenuGroupFactory', 'MenuItemFactory', '$stateParams', 'RestaurantFactory'];

    function RestaurantMenuController(MenuGroupFactory, MenuItemFactory, $stateParams, RestaurantFactory) {
        var vm = this;
        // variables
        vm.menu = [];
        vm.category = [];
        vm.newMenuGroup = {};
        vm.restaurantId = $stateParams.restaurantId;
        vm.emptyMenuGroup = "";

        //functions/methods
        vm.deleteMenuItem = deleteMenuItem;
        vm.addMenuItem = addMenuItem;
        vm.addMenuGroup = addMenuGroup;
        vm.deleteMenuGroup = deleteMenuGroup;

        
        getMenu();

/******* GET ALL ITEMS ON THE MENU ********************************************************************************/
        function getMenu(){
        	RestaurantFactory.getById(vm.restaurantId).then(
        		function(response){
        			vm.menu = response.menuGroups;
        			console.log(vm.menu);
        		}
        	);
        }
/******** DELETE AN ITEM ******************************************************************************************/
        function deleteMenuItem(menuItem){
        	if(confirm("Are you sure you want to remove this item?")){
	        	MenuItemFactory.remove(menuItem.menuItemId).then(
	        		function(response){
	        			getMenu();
	        			alert("Item Deleted");
	        		}
	        	);	
        	}
        }
/********** ADD AN ITEM ******************************************************************************************/
        function addMenuItem(newMenuItem, menuGroupId){
        	newMenuItem.menuGroupId = menuGroupId;
        	MenuItemFactory.add(newMenuItem).then(
        		function(){
        			getMenu();
        			newMenuItem = {};
        		}
        	);
        }
/********** ADD A MENU GROUP
***********************************************************************************************************************/
        function addMenuGroup(newMenuGroup, restaurantId){
            newMenuGroup.restaurantId = restaurantId;
            MenuGroupFactory.add(newMenuGroup).then(
                function(){
                    getMenu();
                    vm.newMenuGroup = {};
                    vm.emptyMenuGroup = "";
                }
            );
        }
/********** DELETE A MENU GROUP
**********************************************************************************************************************/
        function deleteMenuGroup(menuGroup){
            if(confirm("Are you sure you want to remove this item?")){
                MenuGroupFactory.remove(menuGroup.menuGroupId).then(
                    function(){
                        getMenu();
                    }
                );
            }
        }        
        
    }
})();


