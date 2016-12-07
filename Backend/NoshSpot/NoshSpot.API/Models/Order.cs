using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Models
{
    public class Order
    {
        public Order()
        {
            OrderItems = new Collection<OrderItem>();
            Payments = new Collection<Payment>();
        }

        public int OrderId { get; set; }
        public int? RestaurantId { get; set; }
        public int CustomerId { get; set; }

        public DateTime TimeStamp { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Restaurant Restaurant { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }

    }
}