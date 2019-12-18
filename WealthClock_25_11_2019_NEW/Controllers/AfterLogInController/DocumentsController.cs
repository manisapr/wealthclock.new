using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}