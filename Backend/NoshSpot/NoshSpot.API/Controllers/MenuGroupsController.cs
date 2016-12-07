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
    public class MenuGroupsController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // PUT: api/MenuGroups/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMenuGroup(int id, MenuGroup menuGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menuGroup.MenuGroupId)
            {
                return BadRequest();
            }

            var dbMenuGroup = db.MenuGroups.Find(id);

            db.Entry(dbMenuGroup).CurrentValues.SetValues(menuGroup);

            db.Entry(menuGroup).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuGroupExists(id))
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

        // POST: api/MenuGroups
        [ResponseType(typeof(MenuGroup))]
        public IHttpActionResult PostMenuGroup(MenuGroup menuGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MenuGroups.Add(menuGroup);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = menuGroup.MenuGroupId }, menuGroup);
        }

        // DELETE: api/MenuGroups/5
        [ResponseType(typeof(MenuGroup))]
        public IHttpActionResult DeleteMenuGroup(int id)
        {
            MenuGroup menuGroup = db.MenuGroups.Find(id);
            if (menuGroup == null)
            {
                return NotFound();
            }

            db.MenuGroups.Remove(menuGroup);
            db.SaveChanges();

            return Ok(menuGroup);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MenuGroupExists(int id)
        {
            return db.MenuGroups.Count(e => e.MenuGroupId == id) > 0;
        }
    }
}