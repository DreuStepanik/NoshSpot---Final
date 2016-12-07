using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int RestaurantId { get; set; }
        public int CustomerId { get; set; }

        public string ReviewDescription { get; set; }
        public int Rating { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}