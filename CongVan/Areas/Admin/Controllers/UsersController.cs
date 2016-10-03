using CongVan.Entities;
using Kids.Helpers;
using Kids.User.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class UsersController : Controller
    {
        // GET: Admin/Users
        public ActionResult Index()
        {
            //var user = new KidUser() { UserName = "kim" };
            //var userStore = new TUserStore<KidUser>();
            //await userStore.SetPasswordHashAsync(user, "abc@123");
            //await userStore.CreateAsync(user);
            //if (!IsAuthenticated)
            //    return View("Admin/Index");

            ViewBag.listDeparments = Kids.Kid.DBContext.FetchAll<Departments>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();

            return View();
        }

        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listUsers = Kids.Kid.DBContext.FetchAll<User>().ToList();
            var totalRecord = listUsers.Count;
            if (listUsers.Any())
            {
                var pageCount = pageIndex * pageSize;
                if (listUsers.Count > pageCount)
                    listUsers = listUsers.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                else
                    listUsers = listUsers.Skip((pageIndex - 1) * pageSize).Take(listUsers.Count - ((pageIndex - 1) * pageSize)).ToList();
            }

            return Json(new { listUsers, totalRecord }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> Update(string eid, string username, string password, string fullname, string email, 
            string department, string membercode, string address, string position, string image, string phone)
        {
            var userStore = new TUserStore<User>();
            var user = new User();

            user.FullName = fullname;
            user.DepartmentId = department;
            user.MemberCode = membercode;
            user.Address = address;
            user.Position = position;
            user.Image = "";
            user.Phone = phone;
            user.IsActived = true;
            user.Email = email;
            user.UserName = username;
            try
            {
                if (eid == string.Empty)
                {
                    await userStore.SetPasswordHashAsync(user, password);
                    await Kids.Kid.DBContext.AddAsync(user);
                }
                else
                {
                    var userbyid = await userStore.FindByIdAsync(eid);
                    user.Password = userbyid.Password;
                    user.PasswordSalt = userbyid.PasswordSalt;
                    user.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(user);
                }

            }
            catch (Exception)
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public new ActionResult Profile()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }
    }
}