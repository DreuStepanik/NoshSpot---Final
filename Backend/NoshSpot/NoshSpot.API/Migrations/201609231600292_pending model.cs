namespace NoshSpot.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class pendingmodel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "RestaurantId", "dbo.Restaurants");
            DropForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems");
            DropIndex("dbo.Orders", new[] { "RestaurantId" });
            AlterColumn("dbo.Orders", "RestaurantId", c => c.Int());
            CreateIndex("dbo.Orders", "RestaurantId");
            AddForeignKey("dbo.Orders", "RestaurantId", "dbo.Restaurants", "RestaurantId");
            AddForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems", "MenuItemId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems");
            DropForeignKey("dbo.Orders", "RestaurantId", "dbo.Restaurants");
            DropIndex("dbo.Orders", new[] { "RestaurantId" });
            AlterColumn("dbo.Orders", "RestaurantId", c => c.Int(nullable: false));
            CreateIndex("dbo.Orders", "RestaurantId");
            AddForeignKey("dbo.OrderItems", "MenuItemId", "dbo.MenuItems", "MenuItemId");
            AddForeignKey("dbo.Orders", "RestaurantId", "dbo.Restaurants", "RestaurantId", cascadeDelete: true);
        }
    }
}
