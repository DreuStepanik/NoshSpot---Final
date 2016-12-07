using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Models
{
    public class Category
    {
        public Category()
        {
            Restaurants = new Collection<Restaurant>();
        }

        public int CategoryId { get; set; }

        public string CategoryTitle { get; set; }

        public virtual ICollection<Restaurant> Restaurants { get; set; }
    }
}