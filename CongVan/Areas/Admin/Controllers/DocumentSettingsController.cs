using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class DocumentSettingsController : Controller
    {
        // GET: Admin/DocumentSettings
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult DocumentType()
        {
            return View();
        }
    }
}