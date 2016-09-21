using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Controllers
{
    public class BaseNavigationController : Controller
    {
        // GET: BaseNavigation
        //public ActionResult Index()
        //{
        //    return View();
        //}
        public ActionResult DisplaySubMenuNavigation()
        {
            return PartialView("~/Views/Navigation/SubMenuNavigation.cshtml", SubMenuNavigationManager.Load(ControllerContext.RouteData.Values["controller"].ToString()));
        }
    }
}