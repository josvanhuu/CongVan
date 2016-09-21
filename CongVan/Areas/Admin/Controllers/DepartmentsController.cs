using CongVan.Entities;
using Kids.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class DepartmentsController : Controller
    {
        // GET: Admin/Departments
        public ActionResult Index()
        {
            ViewBag.Departments = Kids.Kid.DBContext.FetchAll<Departments>().ToJSON();
            return View();
        }
        [HttpPost]
        public JsonResult Create()
        {
            return new JsonResult();
        }
    }
}