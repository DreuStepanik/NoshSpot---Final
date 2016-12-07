using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Models
{
    public class Restaurant
    {
        public Restaurant()
        {
            Reviews = new Collection<Review>();
            Orders = new Collection<Order>();
            MenuGroups = new Collection<MenuGroup>();
            Category = new Category();
        }

        public int RestaurantId { get; set; }
        public int? CategoryId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string WebSite { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<MenuGroup> MenuGroups { get; set; }
    }
}