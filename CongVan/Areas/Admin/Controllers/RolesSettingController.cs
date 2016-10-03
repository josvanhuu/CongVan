using CongVan.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpPost]
        public async Task<JsonResult> Update(string eid, string code, string name, string description, bool status)
        {
            var rolesetting = new RolesSetting();
            rolesetting.Name = name;
            rolesetting.Code = code;
            rolesetting.Des = description;
            rolesetting.IsStatus = status;
            try
            {
                if (eid == string.Empty)
                {
                    await Kids.Kid.DBContext.AddAsync(rolesetting);
                }
                else
                {
                    rolesetting.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(rolesetting);
                }

            }
            catch (Exception)
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }
    }
}