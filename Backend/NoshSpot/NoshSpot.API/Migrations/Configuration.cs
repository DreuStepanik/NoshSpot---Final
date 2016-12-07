namespace NoshSpot.API.Migrations
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NoshSpot.API.Infrastructure.NoshSpotDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NoshSpot.API.Infrastructure.NoshSpotDataContext context)
        {
            string[] menuGroupTitles = new string[] { "Starters", "Appetizers", "Main", "Desserts", "Entrees", "Soups", "Salads", "Drinks", "Vegetarian", "Vegan", "Pescatarian", "Carnivore", "Omnivore" };

            List<MenuItem> items;
            //context.Categories.Add(new Models.Category { CategoryTitle = "Chinese" });
            var random = new Random();

            context.Categories.AddOrUpdate(
                c => c.CategoryTitle,
                new Models.Category { CategoryTitle = "Chinese" },
                new Models.Category { CategoryTitle = "American" },
                new Models.Category { CategoryTitle = "Italian" },
                new Models.Category { CategoryTitle = "Greek" },
                new Models.Category { CategoryTitle = "Mexican" },
                new Models.Category { CategoryTitle = "Indian" },
                new Models.Category { CategoryTitle = "Vietnamese" },
                new Models.Category { CategoryTitle = "British" },
                new Models.Category { CategoryTitle = "French" },
                new Models.Category { CategoryTitle = "Japanese" }
            );

            context.SaveChanges();

            if(context.Restaurants.Count() == 0)
            {
                for (int i = 0; i < 50; i++)
                {
                    context.Restaurants.AddOrUpdate(
                        r => r.Name,
                        new Models.Restaurant
                        {
                            Address = Faker.LocationFaker.StreetName(),
                            ZipCode = random.Next(10000, 100000),
                            Description = Faker.CompanyFaker.BS(),
                            Email = Faker.InternetFaker.Email(),
                            Name = Faker.CompanyFaker.Name(),
                            Telephone = Faker.PhoneFaker.Phone(),
                            WebSite = Faker.InternetFaker.Domain(),
                            CategoryId = random.Next(1, 11)
                        }
                    );
                }
                
                for (int i = 0; i < 50; i++)
                {
                    context.Customers.Add(new Customer
                    {
                        FirstName = Faker.NameFaker.FirstName(),
                        LastName = Faker.NameFaker.LastName(),
                        Address = Faker.LocationFaker.StreetName(),
                        Email = Faker.InternetFaker.Email(),
                        ZipCode = random.Next(10000, 100000),
                        Telephone = Faker.PhoneFaker.Phone()
                    });
                }

                context.SaveChanges();

                foreach (var restaurant in context.Restaurants)
                {
                    items = new List<MenuItem>();
                    int numberOfMenuGroups = random.Next(2, 4);

                    for (int i = 0; i < numberOfMenuGroups; i++)
                    {
                        var menuGroup = new MenuGroup
                        {
                            MenuGroupTitle = menuGroupTitles[random.Next(1, menuGroupTitles.Length)],
                            RestaurantId = restaurant.RestaurantId
                        };

                        int numberOfMenuItems = random.Next(3, 6);

                        for (int j = 0; j < numberOfMenuItems; j++)
                        {
                            var item = new MenuItem
                            {
                                Description = Faker.CompanyFaker.BS(),
                                Name = Faker.CompanyFaker.BS(),
                                Price = (decimal)Math.Round(random.NextDouble() * 100, 2)
                            };
                            items.Add(item);

                            menuGroup.MenuItems.Add(item);
                        }

                        restaurant.MenuGroups.Add(menuGroup);
                    }

                    foreach(var customer in context.Customers)
                    {
                        int numberOfReviews = random.Next(0, 2);

                        // random number of reviews
                        for (int i = 0; i < numberOfReviews; i++)
                        {
                            restaurant.Reviews.Add(new Review
                            {
                                RestaurantId = restaurant.RestaurantId,
                                CustomerId = customer.CustomerId,
                                ReviewDescription = Faker.TextFaker.Sentences(random.Next(2, 5)),
                                Rating = random.Next(1, 6)
                            });
                        }

                        // random number of orders
                        for(int i = 0; i < random.Next(1, 4); i++)
                        {
                            Order order = new Order
                            {
                                RestaurantId = restaurant.RestaurantId,
                                CustomerId = customer.CustomerId,
                                TimeStamp = DateTime.Now
                            };

                            int numOrderItems = random.Next(1, 4);

                            for (int j = 0; j < numOrderItems; j++)
                            {
                                order.OrderItems.Add(new OrderItem
                                {
                                    MenuItem = items[random.Next(1, items.Count())]
                                });
                            }

                            customer.Orders.Add(order);
                        }
                    }
                }

                context.SaveChanges();

                foreach(var order in context.Orders)
                {
                    foreach(var orderItem in order.OrderItems)
                    {
                        orderItem.OrderId = order.OrderId;
                    }
                }

                context.SaveChanges();
            }
            
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
