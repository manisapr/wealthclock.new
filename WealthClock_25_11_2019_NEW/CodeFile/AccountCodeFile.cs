using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using WealthClock_25_11_2019_NEW.Models;
using System.IO;

namespace WealthClock_25_11_2019_NEW.CodeFile
{
    public class AccountCodeFile
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);

        public DataTable CheckUser(UserRegistration user)
        {
            try {
                DataTable dt = new DataTable();
                SqlCommand com = new SqlCommand("select * from user_details where User_Email=@User_Email and Password=@Password", conn);
                com.Parameters.AddWithValue("@User_Email",user.email);
                com.Parameters.AddWithValue("@Password",user.pass);
                SqlDataAdapter rdr = new SqlDataAdapter(com);
                rdr.Fill(dt);
                return dt;
                
            }
            catch (Exception ex)
            {
                DataTable dt = new DataTable();
                return dt;
            }
            
             
        }

        public int UserRegistration(UserRegistration user)
        {
            int i = 0;
            string CLIENTCODE = "WC" + GenerateOTP();
            SqlCommand com = new SqlCommand("insert into user_details (ClientCode,User_Email,Password,UserName,User_Mobile,User_Regdate,Advisor,IsActive,KycStatus,IsIsipActive,IsXsipActive,BSEImageUpload_Status,Status) values (@ClientCode,@User_Email,@Password,@UserName,@User_Mobile,@User_Regdate,@Advisor,@IsActive,@KycStatus,@IsIsipActive,@IsXsipActive,@BSEImageUpload_Status,@Status)", conn);
            conn.Open();
            com.Parameters.AddWithValue("@ClientCode",CLIENTCODE);
            com.Parameters.AddWithValue("@User_Email",user.email);
            com.Parameters.AddWithValue("@Password",user.pass);
            com.Parameters.AddWithValue("@UserName",user.uname);
            com.Parameters.AddWithValue("@User_Mobile",user.phn);
            com.Parameters.AddWithValue("@User_Regdate",DateTime.Now);
            com.Parameters.AddWithValue("@Advisor",user.advisor);
            com.Parameters.AddWithValue("@IsActive","0");
            com.Parameters.AddWithValue("@KycStatus","0");
            com.Parameters.AddWithValue("@IsIsipActive","0");
            com.Parameters.AddWithValue("@IsXsipActive","0");
            com.Parameters.AddWithValue("@BSEImageUpload_Status","0");
            com.Parameters.AddWithValue("@Status","Online");
            i= Convert.ToInt32(com.ExecuteNonQuery());
            conn.Close();
            
            return i;
        }

        public string checkExistingUserByMail(string email)
        {
            string res = "";
            try {
                
                SqlCommand com = new SqlCommand("select * from user_details where User_Email=@User_Email", conn);
                DataTable dt = new DataTable();
                com.Parameters.AddWithValue("@User_Email", email);
                SqlDataAdapter rdr = new SqlDataAdapter(com);
                rdr.Fill(dt);
                res = dt.Rows[0]["User_Email"].ToString();
                return res;
            }
            catch (Exception ex)
            {
                return res;
            }
            
        }

        public string GenerateOTP()
        {
            string numbers = "ABCDEFGH1234567890";
            string characters = numbers;
            characters += numbers;
            string otp = string.Empty;
            for (int i = 0; i < 8; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            return otp;
        }

        //***
        public string DeleteUserDocsByID(string ID)
        {
            string res = "";
            int id = Convert.ToInt32(ID);
            //file path
            SqlCommand com2 = new SqlCommand("select ImageName from UserDocs where Docs_ID='" + id + "'", conn);
            DataSet ds = new DataSet();
            SqlDataAdapter rdr = new SqlDataAdapter(com2);
            rdr.Fill(ds);
            string imagepath = ds.Tables[0].Rows[0]["ImageName"].ToString();
            //file path
            SqlCommand com = new SqlCommand("delete from UserDocs where Docs_ID='" + id + "'", conn);
            conn.Open();
            int i = Convert.ToInt32(com.ExecuteNonQuery());
            conn.Close();
            if (i > 0)
            {
                return res = imagepath;
            }
            else
            {
                return res = "not";
            }
        }
        public string DeleteFile(string filepath)
        {
            string res = "";

            if (File.Exists(filepath))
            {
                File.Delete(filepath);
                res = "File deleted";
                return res;
            }
            else
            {
                res = "File not deleted";
                return res;
            }

        }
        public DataTable GetDocDetailsByClientID(string ClientCode)
        {
            string res = "";
            SqlCommand com = new SqlCommand("select Docs_ID,Document_Type,Document_Title,Document_Path from UserDocs where ClientCode='" + ClientCode + "'", conn);
            DataTable dt = new DataTable();
            SqlDataAdapter rdr = new SqlDataAdapter(com);
            rdr.Fill(dt);
            return dt;
        }
        
    }
}