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
    public class StoresController : Controller
    {
        private Context db = new Context();

        // GET: Stores
        public ActionResult Index()
        {
            return View(db.Store.ToList());
        }
        // GET Stores
        public JsonResult GetStores()
        {
            var storeList = db.Store.ToList();
            return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //CREATE store
        public JsonResult CreateStores(Store st)
        {
            if (ModelState.IsValid)
            {
                db.Store.Add(st);
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
        //GET Store
        public JsonResult GetStore(int id)
        {
            try
            {
                Store store = db.Store.Where(c => c.Id == id).SingleOrDefault();
                return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // DELETE Store
        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = db.Store.Where(c => c.Id == id).SingleOrDefault();
                if (store != null)
                {
                    db.Store.Remove(store);
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
        //UPDATE Store
        public JsonResult UpdateStore(Store store)
        {
            if (ModelState.IsValid)
            {
                Store st = db.Store.Where(c => c.Id == store.Id).SingleOrDefault();
                st.Name = store.Name;
                st.Address = store.Address;
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
