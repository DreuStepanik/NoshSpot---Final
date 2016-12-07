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
using Stripe;
using NoshSpot.API.Requests;

namespace NoshSpot.API.Controllers
{
    public class PaymentsController : ApiController
    {
        private NoshSpotDataContext db = new NoshSpotDataContext();

        // PUT: api/Payments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPayment(int id, Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != payment.PaymentId)
            {
                return BadRequest();
            }

            var dbPayment = db.Payments.Find(id);
            db.Entry(dbPayment).CurrentValues.SetValues(payment);
            db.Entry(dbPayment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // POST: api/Payments
        [ResponseType(typeof(Payment))]
        public IHttpActionResult PostPayment(Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Payments.Add(payment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = payment.PaymentId }, payment);
        }

        // DELETE: api/Payments/5
        [ResponseType(typeof(Payment))]
        public IHttpActionResult DeletePayment(int id)
        {
            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return NotFound();
            }

            db.Payments.Remove(payment);
            db.SaveChanges();

            return Ok(payment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymentExists(int id)
        {
            return db.Payments.Count(e => e.PaymentId == id) > 0;
        }

        // Stripe route and method
        [HttpPost, Route("api/payments/charge")]
        public IHttpActionResult Charge(StripeChargeRequest request)
        {
            var myCharge = new StripeChargeCreateOptions();

            // always set these properties
            myCharge.Amount = request.OrderAmount;
            myCharge.Currency = "usd";

            // set this if you want to
            myCharge.Description = request.Description;

            myCharge.SourceTokenOrExistingSourceId = request.Token;

            var chargeService = new StripeChargeService();
            StripeCharge stripeCharge = chargeService.Create(myCharge);

            if (stripeCharge.Paid)
            {
                return Ok(new
                {
                    stripeCharge.Amount,
                    stripeCharge.Created,
                    stripeCharge.Currency,
                    stripeCharge.FailureCode,
                    stripeCharge.FailureMessage,
                    stripeCharge.Id,
                    stripeCharge.LiveMode,
                    stripeCharge.Paid,
                    stripeCharge.ReceiptEmail,
                    stripeCharge.StatementDescriptor,
                    stripeCharge.Status
                });
            }
            else
            {
                return BadRequest("Could not complete transaction");
            }
        }
    }
}