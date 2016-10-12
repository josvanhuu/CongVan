using Kids.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class ReportController : AuthenticateController
    {
        // GET: Admin/Report
        public ActionResult Index()
        {
            return View();
        }
    }
}