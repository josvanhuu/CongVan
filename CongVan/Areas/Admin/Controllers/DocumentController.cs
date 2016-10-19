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
using System.Collections.Generic;
using Kids.Services.ImportExport;

namespace CongVan.Areas.Admin.Controllers
{
    public class DocumentController : AuthenticateController
    {
        // GET: Admin/Document
        public ActionResult Index(int? type)
        {
            ViewBag.type = type;
            //type: 0: Cong Van Den, 1: Cong Van Di

            ViewBag.listorganizations = Kids.Kid.DBContext.FetchAll<Organization>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdocumenttype = Kids.Kid.DBContext.FetchAll<DocumentType>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdepartment = Kids.Kid.DBContext.FetchAll<Departments>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listuser = Kids.Kid.DBContext.FetchAll<User>().Select(item => new { id = item.EID, name = item.FullName, departmentId = item.DepartmentId}).ToJSON();

            var currentUser = Kids.Kid.Authentication.GetAuthenticatedUser(); // -- - Get user for Cookies
            var userId = currentUser.Id;

            ViewBag.listdocument = type != 0 ? Kids.Kid.DBContext.FetchAll<DocumentFolder>().Where(item => item.DocumentUser == userId /*&& item.DocumentDepartment == currentUser.Id*/).ToJSON() :
                Kids.Kid.DBContext.FetchAll<DocumentFolder>().Where(item => item.DocumentUserAction == userId /*&& item.DocumentDepartmentAction == currentUser.Id*/).ToJSON();

            return View();
        }
        public ActionResult Search()
        {
            ViewBag.listorganizations = Kids.Kid.DBContext.FetchAll<Organization>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdocumenttype = Kids.Kid.DBContext.FetchAll<DocumentType>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdepartment = Kids.Kid.DBContext.FetchAll<Departments>().Select(item => new { id = item.EID, name = item.Name }).ToJSON();
            ViewBag.listdocument = Kids.Kid.DBContext.FetchAll<DocumentFolder>().ToJSON();

            return View();
        }
        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listDocuments = Kids.Kid.DBContext.FetchAll<DocumentFolder>().ToList();
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
        [AcceptVerbs(HttpVerbs.Post)]
        public async System.Threading.Tasks.Task<JsonResult> Update(int type, string eid, string documentcode,
            string documentname, string documentdes, string documentdate, string documentdateaction, string documenttype,
            string documentdepartment, string documentorganization, string documentuser, string filedirect)
            //, string name, string filename, string filedescription, string filepath,
            //string filetype, string filedirect, string filedatecreated)
        {
            //if (Request.Files != null && Request.Files.Count > 0)
            //{
            //    var user = Kids.Kid.Authentication.GetAuthenticatedUser() as Kids.User.Identity.KidUser;
            //    var intDirect = string.IsNullOrEmpty(filedirect) ? 0 : int.Parse(filedirect);
            //    if (user == null) return Json(0, JsonRequestBehavior.AllowGet);

            //    var userFolder = BaseUtil<TFile>.Instance.GetSpecifyFolder(Path.Combine(Request.PhysicalApplicationPath, "Documents"), user.UserName);
            //    var docFolder = new DocumentFolder();
            //    var listDocument = new List<Document>();
            //    //init docFolder
            //    docFolder.DocumentName = Request.Form["tdocument"].ToString();
            //    //endInit
            //    if (user != null)
            //    {
            //        for (int i = 0; i < Request.Files.Count; i++)
            //        {
            //            var fileUpload = Request.Files[i];
            //            var streamFile = fileUpload.InputStream;

            //            var fileName = BaseUtil<TFile>.Instance.GetFileNameFromFilePath(fileUpload.FileName);

            //            if (BaseUtil<TFile>.Instance.CheckDocumentFile(fileUpload.FileName))
            //            {
            //                var file = new CongVan.Entities.File()
            //                {
            //                    //  Name = fileName.Substring(0, fileName.IndexOf('.')),
            //                    FileName = fileName,
            //                    DateCreated = DateTime.UtcNow.Date,
            //                    //  FileType = FileType.Document,

            //                    InputStream = fileUpload.InputStream,
            //                    IsDeleted = false,

            //                };


            //                if (Kids.Kid.Service<IFileService<CongVan.Entities.File>>().UploadFile(file, userFolder, true))
            //                {
            //                    var doc = new Document()
            //                    {
            //                        Name = fileName.Substring(0, fileName.IndexOf('.')),
            //                        FileDirect = (FileDirect)intDirect,
            //                    };
            //                    doc.VituarlPath = string.Format("/{0}", file.Path.Replace(Request.ServerVariables["APPL_PHYSICAL_PATH"], String.Empty).Replace('\\', '/'));
            //                    listDocument.Add(doc);
            //                }
            //            }
            //            if (listDocument.Any())
            //            {
            //                docFolder.ListDocument = listDocument;
            //                Kids.Kid.DBContext.Add(docFolder);
            //            }
            //        }

            //    }
            //}

            var documentFolder = new DocumentFolder
            {
                DocumentCode = documentcode,
                DocumentName = documentname,
                DocumentDes = documentdes,
                DocumentType = documenttype,
                DocumentDepartment = "GR27ZDKU",
                DocumentUser = "YYRDALHV",
                DocumentDate = documentdate == "" ? DateTime.Today : DateTime.Parse(documentdate),
                DocumentDateAction = documentdateaction == "" ? DateTime.Today : DateTime.Parse(documentdateaction),
                DocumentOrganization = documentorganization,
                DocumentDepartmentAction = documentdepartment,
                DocumentUserAction = documentuser
            };

            try
            {
                if (eid == string.Empty)
                {
                    //documentFolder.DocumentDate = documentdate == "" ? DateTime.Today : DateTime.Parse(documentdate);
                    //documentFolder.DocumentDateAction = documentdateaction == "" ? DateTime.Today : DateTime.Parse(documentdateaction);
                    await Kids.Kid.DBContext.AddAsync(documentFolder);
                }
                else
                {
                    documentFolder.EID = eid;
                    //documentFolder.DocumentDate = DateTime.Parsedocumentdate;
                    //documentFolder.DocumentDateAction = documentdateaction;
                    await Kids.Kid.DBContext.UpdateAsync(documentFolder);
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
                    var docFolder = new DocumentFolder();
                    var listDocument = new List<Document>();
                    //init docFolder
                    docFolder.DocumentName = Request.Form["tdocument"].ToString();
                    //endInit
                    if (user != null)
                    {
                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            var fileUpload = Request.Files[i];
                            var streamFile = fileUpload.InputStream;

                            var fileName = BaseUtil<TFile>.Instance.GetFileNameFromFilePath(fileUpload.FileName);

                            if (BaseUtil<TFile>.Instance.CheckDocumentFile(fileUpload.FileName))
                            {
                                var file = new CongVan.Entities.File()
                                {
                                    //  Name = fileName.Substring(0, fileName.IndexOf('.')),
                                    FileName = fileName,
                                    DateCreated = DateTime.UtcNow.Date,
                                    //  FileType = FileType.Document,

                                    InputStream = fileUpload.InputStream,
                                    IsDeleted = false,

                                };


                                if (Kids.Kid.Service<IFileService<CongVan.Entities.File>>().UploadFile(file, userFolder, true))
                                {
                                    var doc = new Document()
                                    {
                                        Name = fileName.Substring(0, fileName.IndexOf('.')),
                                        FileDirect = (FileDirect)intDirect,
                                    };
                                    doc.VituarlPath = string.Format("/{0}", file.Path.Replace(Request.ServerVariables["APPL_PHYSICAL_PATH"], String.Empty).Replace('\\', '/'));
                                    listDocument.Add(doc);
                                }
                            }
                            if (listDocument.Any())
                            {
                                docFolder.ListDocument = listDocument;
                                Kids.Kid.DBContext.Add(docFolder);
                            }
                        }

                    }
                }
                else if (command == "export")
                {
                    Stream outStream = Response.OutputStream;
                    var exDoc = new List<ExportDocument>();
                    exDoc.Add(new ExportDocument() { FullName = "test1", Description = "a-z" });
                    exDoc.Add(new ExportDocument() { FullName = "test2", Description = "z-a" });


                    return new FileStreamResult(Kids.Kid.Service<IExportService<ExportDocument>>().Export(ExportType.Excel, "text.xls", exDoc)
                        , "application/vnd.ms-excel")
                    { FileDownloadName = "test.xls" };

                }
            return View("Index");
        }

    }
}