using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using OnBoardingTalent.Models;

namespace OnBoardingTask_Mars.Controllers
{
    public class ProductsController : Controller
    {
        private Context db = new Context();

        // GET: View
        public ActionResult Index()
        {
            return View();
        }


        // GET Customers
        public JsonResult GetProducts()
        {
            var productList = db.Product.ToList();
            return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //CREATE customer
        public JsonResult CreateProducts(Product prod)
        {
            if (ModelState.IsValid)
            {
                db.Product.Add(prod);
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
        public JsonResult GetProduct(int id)
        {
            try
            {
                Product product = db.Product.Where(c => c.Id == id).SingleOrDefault();
                return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // DELETE Customer
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                var product = db.Product.Where(c => c.Id == id).SingleOrDefault();
                if (product != null)
                {
                    db.Product.Remove(product);
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
        public JsonResult UpdateProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                Product prod = db.Product.Where(c => c.Id == product.Id).SingleOrDefault();
                prod.Name = product.Name;
                prod.Price = product.Price;
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