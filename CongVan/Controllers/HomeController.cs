using Kids.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Controllers
{
    public class HomeController : AuthenticateController
    {
        public ActionResult Index()
        {
            if (!IsAuthenticated)
            {
                return Redirect("/Admin/Login");
            } 
            else
            {
                return Redirect("/Admin/Document?type=0");
                //0: Cong Van Den, 1: Cong Van Di, 2: Tim kiem

            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}