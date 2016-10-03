using System.Web.Mvc;
using Kids.MVC.Controller;
using Kids.Services.Files;
using Kids.Utils;
using System.IO;
using System.Web;
using CongVan.Entities;
using System;
using System.Web.Configuration;
using System.Linq;
using Kids.Helpers;
using Kids.Admin;

namespace CongVan.Areas.Admin.Controllers
{
    public class DocumentController : AuthenticateController
    {
        // GET: Admin/Document
        public ActionResult Index()
        {
            ViewBag.listdocumenttype = Kids.Kid.DBContext.FetchAll<DocumentType>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdepartment = Kids.Kid.DBContext.FetchAll<Departments>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            //ViewBag.listuser = Kids.Kid.DBContext.FetchAll<User>().Select(item => new { Id = item.EID, Name = item.}).ToJSON();
            return View();
        }
        public ActionResult Search()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listDocuments = Kids.Kid.DBContext.FetchAll<Document>().ToList();
            if (listDocuments.Any())
            {
                var pageCount = pageIndex * pageSize;
                if (listDocuments.Count > pageCount)
                    listDocuments = listDocuments.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                else
                    listDocuments = listDocuments.Skip((pageIndex - 1) * pageSize).Take(listDocuments.Count - ((pageIndex - 1) * pageSize)).ToList();
            }

            return Json(listDocuments, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async System.Threading.Tasks.Task<JsonResult> Update(string eid, string documentcode, 
            string documentname, string documentdes, string documentdate, string documentdateaction, string documenttype,
            string documentdepartment, string name, string filename, string filedescription, string filepath,
            string filetype, string filedirect, string filedatecreated)
        {
            //if (Request.Files != null && Request.Files.Count > 0)
            //{
            //    var user = Kids.Kid.Authentication.GetAuthenticatedUser() as Kids.User.Identity.KidUser;
            //    var intDirect = string.IsNullOrEmpty(filedirect) ? 0 : int.Parse(filedirect);

            //    if (user == null) return Json(0, JsonRequestBehavior.AllowGet);

            //    var userFolder = BaseUtil<TFile>.Instance.GetSpecifyFolder(Path.Combine(Request.PhysicalApplicationPath, "Documents"), user.UserName);
            //    if (user != null)
            //    {
            //        for (int i = 0; i < Request.Files.Count; i++)
            //        {
            //            var fileUpload = Request.Files[i];
            //            var streamFile = fileUpload.InputStream;

            //            var fileName = BaseUtil<TFile>.Instance.GetFileNameFromFilePath(fileUpload.FileName);

            //            if (BaseUtil<TFile>.Instance.CheckDocumentFile(fileUpload.FileName))
            //            {
            //                var doc = new Document()
            //                {
            //                    Name = Request.Form["tdocument"] != null && Request.Form["tdocument"].ToString() != string.Empty ? Request.Form["tdocument"].ToString() : fileName,
            //                    FileName = fileName,
            //                    DateCreated = DateTime.UtcNow.Date,
            //                    FileType = FileType.Document,
            //                    FileDirect = (FileDirect)intDirect,
            //                    InputStream = fileUpload.InputStream,
            //                    IsDeleted = false
            //                };
            //                Kids.Kid.Service<IFileService<Document>>().UploadFile(doc, userFolder, true);
            //            }
            //        }

            //    }
            //}

            var document = new Document {
                //EID = eid,
                DocumentCode = documentcode,
                DocumentName = documentname,
                DocumentDes = documentdes,
                DocumentType = documenttype,
                DocumentDepartment = documentdepartment,
                DocumentDate = DateTime.Parse(documentdate),
                DocumentDateAction = DateTime.Parse(documentdateaction)
            };
            
            try
            {
                if (eid == string.Empty)
                {
                    await Kids.Kid.DBContext.AddAsync(document);
                }
                else
                {
                    document.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(document);
                }

            }
            catch (Exception)
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }

            return Json(1, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DocumentAction(string command, string filedirect)
        {
            if (command == "upload")
                if (Request.Files != null && Request.Files.Count > 0)
                {
                    var user = Kids.Kid.Authentication.GetAuthenticatedUser() as Kids.User.Identity.KidUser;
                    var intDirect = string.IsNullOrEmpty(filedirect) ? 0 : int.Parse(filedirect);
                    if (user == null) return View("Index");

                    var userFolder = BaseUtil<TFile>.Instance.GetSpecifyFolder(Path.Combine(Request.PhysicalApplicationPath, "Documents"), user.UserName);
                    if (user != null)
                    {
                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            var fileUpload = Request.Files[i];
                            var streamFile = fileUpload.InputStream;

                            var fileName = BaseUtil<TFile>.Instance.GetFileNameFromFilePath(fileUpload.FileName);

                            if (BaseUtil<TFile>.Instance.CheckDocumentFile(fileUpload.FileName))
                            {
                                var doc = new Document()
                                {
                                    Name = Request.Form["tdocument"] != null && Request.Form["tdocument"].ToString() != string.Empty ? Request.Form["tdocument"].ToString() : fileName,
                                    FileName = fileName,
                                    DateCreated = DateTime.UtcNow.Date,
                                    FileType = FileType.Document,
                                    FileDirect = (FileDirect)intDirect,
                                    InputStream = fileUpload.InputStream,
                                    IsDeleted = false
                                };
                                Kids.Kid.Service<IFileService<Document>>().UploadFile(doc, userFolder, true);
                            }
                        }

                    }
                }
            return View("Index");
        }

    }
}