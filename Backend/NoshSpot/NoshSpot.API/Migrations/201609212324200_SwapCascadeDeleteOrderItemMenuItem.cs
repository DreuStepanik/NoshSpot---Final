namespace NoshSpot.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SwapCascadeDeleteOrderItemMenuItem : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems");
            DropForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders");
            AddForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems", "MenuItemId");
            AddForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders", "OrderId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems");
            AddForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders", "OrderId");
            AddForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems", "MenuItemId", cascadeDelete: true);
        }
    }
}
