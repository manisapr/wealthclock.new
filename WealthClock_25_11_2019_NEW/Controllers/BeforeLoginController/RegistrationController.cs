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
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RegistrationPage()
        {
            return View();
        }
        public ActionResult UserRegistration()
        {
            AccountCodeFile acf = new AccountCodeFile();
            UserRegistration obj = new UserRegistration();
           string email= obj.uname = Request.Form.Get("_uname");
            obj.phn = Request.Form.Get("_phn");
            obj.email = Request.Form.Get("_email");
            obj.pass = Request.Form.Get("_pass");
            obj.advisor = Request.Form.Get("_advisor");
            string check = acf.checkExistingUserByMail(email);
            if (check == "" || check == null)
            {
                int i = Convert.ToInt32(acf.UserRegistration(obj));
                if (i > 0)
                {
                    return Json("Success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("Not done", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("already exist", JsonRequestBehavior.AllowGet);
            }
            
        }
    }
}