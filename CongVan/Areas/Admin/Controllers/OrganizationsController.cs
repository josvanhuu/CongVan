using CongVan.Entities;
using Kids.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class OrganizationsController : Controller
    {
        // GET: Admin/Organizations
        public ActionResult Index()
        {
            ViewBag.listOrganizations = Kids.Kid.DBContext.FetchAll<Organization>().ToJSON();
            return View();
        }
        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listOrganizations = Kids.Kid.DBContext.FetchAll<Organization>().ToList();
            var totalRecord = listOrganizations.Count;
            if (listOrganizations.Any())
            {
                var pageCount = pageIndex * pageSize;
                if (listOrganizations.Count > pageCount)
                    listOrganizations = listOrganizations.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                else
                    listOrganizations = listOrganizations.Skip((pageIndex - 1) * pageSize).Take(listOrganizations.Count - ((pageIndex - 1) * pageSize)).ToList();
            }

            return Json(new { listOrganizations, totalRecord }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public async Task<JsonResult> Update(string eid, string code, string name, string des)
        {
            var oranization = new Organization();
            oranization.Name = name;
            oranization.Code = code;
            oranization.Des = des;
            try
            {
                if (eid == string.Empty)
                {
                    await Kids.Kid.DBContext.AddAsync(oranization);
                }
                else
                {
                    oranization.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(oranization);
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