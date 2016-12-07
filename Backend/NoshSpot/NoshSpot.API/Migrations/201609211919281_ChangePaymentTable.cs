namespace NoshSpot.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangePaymentTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Payments", "PaymentDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Payments", "PaymentAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.Payments", "AmountDue");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Payments", "AmountDue", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.Payments", "PaymentAmount");
            DropColumn("dbo.Payments", "PaymentDate");
        }
    }
}
