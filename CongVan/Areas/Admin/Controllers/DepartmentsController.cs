using CongVan.Entities;
using Kids.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.IO;
using Newtonsoft.Json;

namespace CongVan.Areas.Admin.Controllers
{
    public class DepartmentsController : Controller
    {
        // GET: Admin/Departments
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listDepartments = Kids.Kid.DBContext.FetchAll<Departments>().ToList();
            var totalRecord = listDepartments.Count;
            if (listDepartments.Any())
            {
                var pageCount = pageIndex * pageSize;
                if (listDepartments.Count > pageCount)
                    listDepartments = listDepartments.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                else
                    listDepartments = listDepartments.Skip((pageIndex - 1) * pageSize).Take(listDepartments.Count - ((pageIndex - 1) * pageSize)).ToList();
            }

            return Json(new { listDepartments, totalRecord}, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public async Task<JsonResult> Update(string eid, string code, string name, string address, string phone, string email, string description)
        {
            var deparment = new Departments();
            deparment.Name = name;
            deparment.Code = code;
            deparment.Address = address;
            deparment.Phone = phone;
            deparment.Email = email;
            deparment.Description = description;
            try
            {
                if(eid == string.Empty)
                {
                    await Kids.Kid.DBContext.AddAsync(deparment);
                }
                else
                {
                    deparment.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(deparment);
                }

            }
            catch (Exception)
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PartialAddDepartments()
        {
            return PartialView("_PartialAddOrEdit");
        }
    }
}