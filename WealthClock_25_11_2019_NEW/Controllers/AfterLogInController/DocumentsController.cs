using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WealthClock_25_11_2019_NEW.CodeFile;
using WealthClock_25_11_2019_NEW.Helper;
using WealthClock_25_11_2019_NEW.Models;

namespace WealthClock_25_11_2019_NEW.Controllers.AfterLogInController
{
    public class DocumentsController : Controller
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        // GET: Documents
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Documents()
        {
            if (Request.IsAuthenticated)
            {
                string ClientCode = User.Identity.Name.Split('|')[0];
                string User_Email = User.Identity.Name.Split('|')[1];
                SqlCommand com = new SqlCommand("select count(*) from UserDocs where User_email=@Email", conn);
                com.Parameters.AddWithValue("@Email", User_Email);
                conn.Open();
                ViewBag.documentCount = com.ExecuteScalar();
                conn.Close();
                return View();
            }
            else
            {
                return RedirectToAction("index", "home");
            }
        }
        public ActionResult forDropDown()
        {
            string _doctype = Request.Form.Get("_dctype");
            Session["_doctype"] = _doctype;
            return Json(_doctype, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DocTitle()
        {
            //_docTitle
            string docTitle = Request.Form.Get("_docTitle");
            Session["_docTitle"] = docTitle;
            return Json(docTitle, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Upload()
        {
            string ClientCode = User.Identity.Name.Split('|')[0];
            string User_Email = User.Identity.Name.Split('|')[1];
            string doctype = Session["_doctype"].ToString();
            string doctitle = Session["_docTitle"].ToString();
            bool isSavedSuccessfully = true;
            string fName = "";
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {
                        var path = Path.Combine(Server.MapPath("~/UploadedDocument/Doc"));
                        string pathString = System.IO.Path.Combine(path.ToString());
                        var fileName1 = Path.GetFileName(file.FileName);
                        string file_exe = Path.GetExtension(file.FileName);
                        bool isExists = System.IO.Directory.Exists(pathString);
                        if (!isExists) System.IO.Directory.CreateDirectory(pathString);
                        //Path save into the database(Begin)
                        DataSet ds = new DataSet();
                        SqlCommand com = new SqlCommand("insert into UserDocs(ClientCode,User_email,Document_Type,Document_Title,Document_Path,DateTime,ImageName) values (@ClientCode,@User_email,@Document_Type,@Document_Title,@Document_Path,@DateTime,@ImageName)", conn);
                        com.Parameters.AddWithValue("@ClientCode", ClientCode);
                        com.Parameters.AddWithValue("@User_email", User_Email);
                        com.Parameters.AddWithValue("@Document_Type", doctype);
                        com.Parameters.AddWithValue("@Document_Title", doctitle);
                        string filename = Guid.NewGuid() + "_" + ClientCode + file_exe;
                        com.Parameters.AddWithValue("@Document_Path", "https://hih7.azurewebsites.net/" + "UploadedDocument/Doc/" + filename);
                        //com.Parameters.AddWithValue("@Document_Path", "http://localhost:50092/" + "UploadedDocument/Doc/" + filename);
                        com.Parameters.AddWithValue("@DateTime", DateTime.Now);
                        com.Parameters.AddWithValue("@ImageName", filename);
                        SqlDataAdapter rdr = new SqlDataAdapter(com);
                        rdr.Fill(ds);
                        //Path save into the database(End)
                        var uploadpath = string.Format("{0}\\{1}", pathString, filename);
                        file.SaveAs(uploadpath);

                    }
                }
            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }
            if (isSavedSuccessfully)
            {
                return Json(new
                {
                    Message = fName
                });
            }
            else
            {
                return Json(new
                {
                    Message = "Error in saving file"
                });
            }
        }
        public ActionResult UploadedDocuments()
        {
            if (Request.IsAuthenticated)
            {

                return View();
            }
            else
            {
                return RedirectToAction("index", "home");
            }
        }

        public ActionResult getAlldetails()
        {
            AccountCodeFile acf = new AccountCodeFile();
            string ClientCode = User.Identity.Name.Split('|')[0];
            DataTable dt = acf.GetDocDetailsByClientID(ClientCode);
            List<DocDetails> lst = Utility.ConvertDataTableToClassObjectList<DocDetails>(dt);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete()
        {
            var id = Request.Form.Get("_id");
            AccountCodeFile acf = new AccountCodeFile();
            string res = acf.DeleteUserDocsByID(id).ToString();
            //delete file
            var fullPath = Server.MapPath("~/UploadedDocument/Doc/" + res);
            res = acf.DeleteFile(fullPath);
            //delete file
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}