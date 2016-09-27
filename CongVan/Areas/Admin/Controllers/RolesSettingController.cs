using CongVan.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class RolesSettingController : Controller
    {
        // GET: Admin/RolesSetting
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Load()
        {
            var listRolesSetting = Kids.Kid.DBContext.FetchAll<RolesSetting>().ToList();
            return Json(listRolesSetting, JsonRequestBehavior.AllowGet);
        }
    }
}