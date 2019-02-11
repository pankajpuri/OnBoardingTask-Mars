using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using OnBoardingTalent.Models;

namespace OnBoardingTask_Mars.Controllers
{
    public class CustomerController : Controller
    {
        private Context db = new Context();

        // GET: View
        public ActionResult Index()
        {
            return View();
        }

       
        // GET Customers
        public JsonResult GetCustomers()
        {
            var customerList = db.Customer.ToList();
            return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //CREATE customer
        public JsonResult CreateCustomers(Customer cust)
        {
            if (ModelState.IsValid)
            {
                db.Customer.Add(cust);
                db.SaveChanges();
                return new JsonResult { Data = "Sucess", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
            {
                //Console.Write(e.Data + "Exception Occured");
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult { Data = modelErrors, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
            //GET Customer
            public JsonResult GetCustomer(int id)
            {
            try
            {
                Customer customer = db.Customer.Where(c => c.Id == id).SingleOrDefault();
                return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Customer Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // DELETE Customer
        public JsonResult DeleteCustomer(int id)
        {
            try
            {
                var customer = db.Customer.Where(c => c.Id == id).SingleOrDefault();
                if (customer != null)
                {
                    db.Customer.Remove(customer);
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Deletion Falied", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //UPDATE Customer
        public JsonResult UpdateCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                Customer cus = db.Customer.Where(c => c.Id == customer.Id).SingleOrDefault();
                cus.Name = customer.Name;
                cus.Address = customer.Address;
                db.SaveChanges();
                return new JsonResult { Data = "Sucess", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
            {
                //Console.Write(e.Data + "Exception Occured");
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult { Data = modelErrors, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
    }
}