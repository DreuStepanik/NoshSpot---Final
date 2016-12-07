using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NoshSpot.API.Infrastructure;
using NoshSpot.API.Models;

namespace NoshSpot.API.Controllers
{
    public class CategoriesController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // GET: api/Categories
        public dynamic GetCategories()
        {
            return db.Categories.Select(c => new
            {
                CategoryId = c.CategoryId,
                CategoryTitle = c.CategoryTitle
            });
        }

        // GET: api/Categories/5
        [ResponseType(typeof(object))]
        public IHttpActionResult GetCategory(int id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                CategoryId = category.CategoryId,
                CategoryTitle = category.CategoryTitle,
                Restaurants = category.Restaurants.Select(r => new
                {
                    RestaurantId = r.RestaurantId,
                    CategoryId = r.CategoryId,
                    Name = r.Name,
                    Description = r.Description,
                    Address = r.Address,
                    ZipCode = r.ZipCode,
                    Telephone = r.Telephone,
                    Email = r.Email,
                    WebSite = r.WebSite,
                    AverageReview = r.Reviews.Count > 0 ? Math.Round(r.Reviews.Average(rr => (double)rr.Rating), 2) : 0
                })
            });
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategory(int id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            var dbCategory = db.Categories.Find(id);

            db.Entry(dbCategory).CurrentValues.SetValues(category);

            db.Entry(dbCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        [ResponseType(typeof(Category))]
        public IHttpActionResult PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(category);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = category.CategoryId }, category);
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        public IHttpActionResult DeleteCategory(int id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            db.SaveChanges();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.CategoryId == id) > 0;
        }
    }
}