using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using WealthClock_25_11_2019_NEW.Models;
using WealthClock_25_11_2019_NEW.CodeFile;
using System.Web.Security;

namespace WealthClock_25_11_2019_NEW.Controllers.BeforeLoginController
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LoginPage()
        {
            return View();
        }
        public ActionResult checkUser()
        {
            AccountCodeFile acf = new AccountCodeFile();
            UserRegistration obj = new UserRegistration();
            obj.email = Request.Form.Get("_email");
            obj.pass = Request.Form.Get("_pass");
            DataTable dt = (acf.CheckUser(obj));
            if (dt.Rows.Count > 0)
            {
                FormsAuthentication.SetAuthCookie(dt.Rows[0]["ClientCode"] + "|" + dt.Rows[0]["User_Email"] + "|" + dt.Rows[0]["Password"] + "|" + dt.Rows[0]["UserName"] + "|" + dt.Rows[0]["User_City"] + "|" + dt.Rows[0]["User_Pincode"] + "|" + dt.Rows[0]["User_State"] + "|" + dt.Rows[0]["User_Country"] + "|" + dt.Rows[0]["User_PanNo"] + "|" + dt.Rows[0]["User_Mobile"] + "|" + dt.Rows[0]["GuardianName"], false);
                return Json("Success", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Not done", JsonRequestBehavior.AllowGet);
            }

        }
    }
}