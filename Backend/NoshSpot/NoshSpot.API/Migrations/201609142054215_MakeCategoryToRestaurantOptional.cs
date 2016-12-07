namespace NoshSpot.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeCategoryToRestaurantOptional : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Restaurants", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Restaurants", new[] { "CategoryId" });
            AlterColumn("dbo.Restaurants", "CategoryId", c => c.Int());
            CreateIndex("dbo.Restaurants", "CategoryId");
            AddForeignKey("dbo.Restaurants", "CategoryId", "dbo.Categories", "CategoryId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Restaurants", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Restaurants", new[] { "CategoryId" });
            AlterColumn("dbo.Restaurants", "CategoryId", c => c.Int(nullable: false));
            CreateIndex("dbo.Restaurants", "CategoryId");
            AddForeignKey("dbo.Restaurants", "CategoryId", "dbo.Categories", "CategoryId", cascadeDelete: true);
        }
    }
}
