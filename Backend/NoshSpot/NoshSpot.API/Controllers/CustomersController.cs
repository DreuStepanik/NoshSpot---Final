using NoshSpot.API.Infrastructure;
using NoshSpot.API.Models;
using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace NoshSpot.API.Controllers
{
    public class CustomersController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // GET: api/Customers
        public dynamic GetCustomers()
        {
            return db.Customers.Select(c => new
            {
                CustomerId = c.CustomerId,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Address = c.Address,
                ZipCode = c.ZipCode,
                Telephone = c.Telephone,
                Email = c.Email,
                AverageReview = c.Reviews.Count > 0 ? Math.Round(c.Reviews.Average(cr => (double)cr.Rating), 2) : 0,
                OrderCount = c.Orders.Count
            });
        }

        // GET: api/Customers/5
        [ResponseType(typeof(object))]
        public IHttpActionResult GetCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                CustomerId = customer.CustomerId,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Address = customer.Address,
                ZipCode = customer.ZipCode,
                Telephone = customer.Telephone,
                Email = customer.Email,
                Reviews = customer.Reviews.Select(cr => new
                {
                    ReviewId = cr.ReviewId,
                    RestaurantId = cr.RestaurantId,
                    CustomerId = cr.CustomerId,
                    ReviewDescription = cr.ReviewDescription,
                    Rating = cr.Rating,
                    Restaurant = new
                    {
                        RestaurantId = cr.RestaurantId,
                        Name = cr.Restaurant.Name
                    }
                }),
                Orders = customer.Orders.Select(co => new
                {
                    OrderId = co.OrderId,
                    TimeStamp = co.TimeStamp,
                    OrderTotal = co.OrderItems.Sum(oi => oi.MenuItem.Price),
                    NumItemsOrdered = co.OrderItems.Count,
                    Paid = co.Payments.Sum(p => p.PaymentAmount) >= co.OrderItems.Sum(oi => oi.MenuItem.Price),
                    Restaurant = new
                    {
                        co.RestaurantId,
                        Name = (co.Restaurant == null) ? "N/A" : co.Restaurant.Name 
                    },
                    OrderItems = co.OrderItems.Select(oi => new
                    {
                        oi.OrderItemId,
                        MenuItem = new
                        {
                            oi.MenuItemId,
                            oi.MenuItem.Name,
                            oi.MenuItem.Description,
                            oi.MenuItem.Price,
                        }
                    }),
                })
            });
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            var dbCustomer = db.Customers.Find(id);

            db.Entry(dbCustomer).CurrentValues.SetValues(customer);

            db.Entry(dbCustomer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.CustomerId }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.CustomerId == id) > 0;
        }
    }
}