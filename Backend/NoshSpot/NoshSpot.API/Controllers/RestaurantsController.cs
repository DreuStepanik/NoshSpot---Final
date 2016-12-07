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
    public class RestaurantsController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // GET: api/Restaurants
        public dynamic GetRestaurants()
        {
            return db.Restaurants.Select(r => new
            {
                r.RestaurantId,
                r.Name,
                r.Description,
                r.Address,
                r.ZipCode,
                r.Telephone,
                r.Email,
                r.WebSite,
                Category = new
                {
                    r.CategoryId,
                    r.Category.CategoryTitle
                },
                AverageReview = r.Reviews.Count > 0 
                                    ? Math.Round(r.Reviews.Average(rr => (double)rr.Rating), 2) 
                                    : 0
            });
        }

        // GET: api/Restaurants/5
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult GetRestaurant(int id)
        {
            Restaurant restaurant = db.Restaurants.Find(id);
            if (restaurant == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                restaurant.RestaurantId,
                restaurant.Name,
                restaurant.Description,
                restaurant.Address,
                restaurant.ZipCode,
                restaurant.Telephone,
                restaurant.Email,
                restaurant.WebSite,
                AverageRating = restaurant.Reviews.Count > 0 ? Math.Round(restaurant.Reviews.Average(rr => (double)rr.Rating), 2) : 0,
                Category = new
                {
                    restaurant.CategoryId,
                    restaurant.Category.CategoryTitle
                },
                MenuGroups = restaurant.MenuGroups.Select(mg => new
                {
                    mg.MenuGroupId,
                    mg.MenuGroupTitle,
                    MenuItems = mg.MenuItems.Select(mi => new
                    {
                        mi.MenuItemId,
                        mi.Name,
                        mi.Description,
                        mi.Price
                    })
                }),
                Reviews = restaurant.Reviews.Select(rr => new
                {
                    rr.ReviewId,
                    Customer = new
                    {
                        rr.Customer.CustomerId,
                        rr.Customer.FirstName,
                        rr.Customer.LastName
                    },
                    rr.ReviewDescription,
                    rr.Rating
                }),
                Orders = restaurant.Orders.Select(ro => new
                {
                    ro.OrderId,
                    ro.TimeStamp,
                    Customer = new
                    {
                        ro.Customer.CustomerId,
                        ro.Customer.FirstName,
                        ro.Customer.LastName
                    },
                    NumItemsOrdered = ro.OrderItems.Count,
                    TotalPrice = ro.OrderItems.Sum(oi => oi.MenuItem.Price)
                })
            });
        }

        // PUT: api/Restaurants/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRestaurant(int id, Restaurant restaurant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != restaurant.RestaurantId)
            {
                return BadRequest();
            }

            var restaurantToBeUpdated = db.Restaurants.Find(id);
            db.Entry(restaurantToBeUpdated).CurrentValues.SetValues(restaurant);
            db.Entry(restaurantToBeUpdated).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantExists(id))
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

        // POST: api/Restaurants
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult PostRestaurant(Restaurant restaurant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Restaurants.Add(restaurant);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = restaurant.RestaurantId }, restaurant);
        }

        // DELETE: api/Restaurants/5
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult DeleteRestaurant(int id)
        {
            Restaurant restaurant = db.Restaurants.Find(id);
            if (restaurant == null)
            {
                return NotFound();
            }

            foreach(var order in restaurant.Orders)
            {
                order.RestaurantId = null;
            }

            db.Restaurants.Remove(restaurant);
            db.SaveChanges();

            return Ok(restaurant);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RestaurantExists(int id)
        {
            return db.Restaurants.Count(e => e.RestaurantId == id) > 0;
        }
    }
}