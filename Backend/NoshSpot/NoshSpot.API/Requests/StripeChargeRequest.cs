using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NoshSpot.API.Requests
{
    public class StripeChargeRequest
    {
        public string Token { get; set; }
        public int OrderAmount { get; set; }
        public string Description { get; set; }
    }
}