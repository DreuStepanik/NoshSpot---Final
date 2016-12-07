using NoshSpot.API.Infrastructure;
using NoshSpot.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace NoshSpot.API.Controllers
{
    public class OrdersController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // GET: api/Orders
        public dynamic GetOrders()
        {
            return db.Orders.Select(o => new
            {
                o.OrderId,
                o.TimeStamp,
                Customer = new
                {
                    o.Customer.CustomerId,
                    o.Customer.FirstName,
                    o.Customer.LastName,
                    o.Customer.Telephone,
                    o.Customer.Email
                },
                Restaurant = new
                {
                    o.Restaurant.RestaurantId,
                    Category = new
                    {
                        o.Restaurant.CategoryId,
                        o.Restaurant.Category.CategoryTitle
                    },
                    o.Restaurant.Name,
                    o.Restaurant.Telephone
                }
            });
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                order.OrderId,
                order.TimeStamp,
                Customer = new
                {
                    order.Customer.CustomerId,
                    order.Customer.FirstName,
                    order.Customer.LastName,
                    order.Customer.Address,
                    order.Customer.ZipCode,
                    order.Customer.Telephone,
                    order.Customer.Email
                },
                Restaurant = new
                {
                    order.Restaurant.RestaurantId,
                    Category = new
                    {
                        order.Restaurant.CategoryId,
                        order.Restaurant.Category.CategoryTitle
                    },
                    order.Restaurant.Name,
                    order.Restaurant.Description,
                    order.Restaurant.Address,
                    order.Restaurant.ZipCode,
                    order.Restaurant.Telephone,
                    order.Restaurant.Email,
                    order.Restaurant.WebSite,
                    AverageReview = order.Restaurant.Reviews.Count > 0 ? Math.Round(order.Restaurant.Reviews.Average(rr => (double)rr.Rating), 2) : 0
                },
                OrderItems = order.OrderItems.Select(oi => new
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
                Payments = order.Payments.Select(p => new
                {
                    p.PaymentId,
                    p.PaymentAmount,
                    p.PaymentDate
                })
            });
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderId)
            {
                return BadRequest();
            }

            var dbOrder = db.Orders.Find(id);
            db.Entry(dbOrder).CurrentValues.SetValues(order);
            db.Entry(dbOrder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(order);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderId == id) > 0;
        }
    }
}