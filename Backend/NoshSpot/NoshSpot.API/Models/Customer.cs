using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Models
{
    public class Customer
    {
        public Customer()
        {
            Reviews = new Collection<Review>();
            Orders = new Collection<Order>();
        }
        public int CustomerId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}