using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ARB_Platform.Data.System;
using ARB_Platform.Model.System;
using ARB_Platform.DataAccess.System;
using System.Linq;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using System.Collections;
using System;
using ARB_Platform.Common.DataAccess;
using IdentityServer3.Core.Services;
using Microsoft.IdentityModel.Tokens;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using System.Security.Cryptography;
using System.Text;

namespace ARB_Platform.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    public class sys_userController : commonController
    {
        //private phạm vi truy cập của class đó;
        //readonly không thể thay đổi giá trị;
       
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private sys_user_repo _repo;
        private common_repo _common_repo;
        public sys_userController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _repo = new sys_user_repo(configuration, env);
            _common_repo = new common_repo(configuration, env);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "Select * from sys_user where status_del = 1  order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [Route("getAll")]
        [HttpPost]
        public JsonResult getAll(sys_user_model user)
        {
            var ten_nguoi_cap_nhat = "(Select top 1 fullname from sys_user where id = sys_user.update_by) as ten_nguoi_cap_nhat,";
            string query = "Select" + ten_nguoi_cap_nhat +
                "*" +"from sys_user where status_del = '"+user.status_del+"' and " +
                "(fullname LIKE '%"+user.search+"%' or phone LIKE '%"+user.search+"%' or address LIKE '%"+user.search+"%' or email LIKE '%"+user.search+"%')   " +
                "order by  update_date desc";
             var table = _common_repo.Connect(query);
            //var row = table.Rows.OfType<DataRow>().Select(q=>q.ItemArray).ToList();
            List<JObject> dataList = new List<JObject>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                JObject eachRowObj = new JObject();
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    string key_n = Convert.ToString(table.Columns[j]);
                    string value = Convert.ToString(table.Rows[i].ItemArray[j]);
                    if (!string.IsNullOrEmpty(value) && key_n == "hasPassword")
                    {
                        value = Decrypt(value);
                    }
                    eachRowObj.Add(key_n, value);
                }
                dataList.Add(eachRowObj);

            }
            return new JsonResult(dataList); 
        }

  
        [HttpPost]
        public JsonResult Post(sys_user_db user)
        {
            var check = checkModelStateCreate(user);
            if (!check)
            {
                return generateError();
            }
            user.hasPassword = encrypt(user.hasPassword);
            //var decrypted = DecryptString(encrypted, key);
            user.update_date = DateTime.Now;
            user.id = Guid.NewGuid().ToString();
            user.update_by = user.id;
            user.status_del = 1;
            checkModelStateCreate(user);
            string query = @"Insert into sys_user values (
                '" + user.id + "',N'" + user.fullname + "','" + user.email + "','" + user.phone + "'," +
                "N'" + user.address + "','" + user.status_del + "','" + user.gender + "','" + user.update_by + "'," +
                "'" + user.update_date + "','" + user.birthday + "',N'" + user.avatar + "',N'" + user.hasPassword + "',N'" + user.cover_image + "')";
            _common_repo.Connect(query);
            return new JsonResult("Thêm mới thành công");
        }
        private bool checkModelStateCreate(sys_user_db model)
        {
            if (string.IsNullOrEmpty(model.fullname))
            {
                ModelState.AddModelError("fullname", "requied");
            }
            if (string.IsNullOrEmpty(model.email))
            {
                ModelState.AddModelError("email", "requied");
            }
            if (model.phone == null)
            {
                ModelState.AddModelError("phone", "requied");
            }
            if (model.hasPassword == null)
            {
                ModelState.AddModelError("hasPassword", "requied");
            }
            return ModelState.IsValid;
        }

        [HttpPut]
        public JsonResult Put(sys_user_db user)
        {
            user.update_date = DateTime.Now;
            user.hasPassword = encrypt(user.hasPassword);
            user.update_by = user.id;
            string query = @"Update sys_user set fullname = N'"+ user.fullname+"',email = '"+user.email+"'" +
             ",phone = '"+user.phone + "',address = N'"+user.address + "',gender = '"+user.gender + "'" +
             ",update_date = N'"+user.update_date + "',update_by = N'"+user.update_by + "'" +
             ",status_del = N'"+user.status_del + "',birthday = N'"+user.birthday + "',avatar = N'" + user.avatar + "',hasPassword = N'"+user.hasPassword + "',cover_image = N'"+user.cover_image + "'"
            + "where id ='"+ user.id+"'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }

        
        [Route("getListUse")]
        [HttpPost]
        public JsonResult getListUse(sys_user_db db)
        {
            string query = "Select id,fullname as name from sys_user where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }


        [Route("dangNhap")]
        [HttpPost]
        public JsonResult dangNhap(sys_user_db db)
        {
            db.hasPassword  = encrypt(db.hasPassword);
            string query = "Select" +
              "*" + "from sys_user where status_del = '" + 1 + "' and " +
              "email = '" + db.email + "' and hasPassword = '" + db.hasPassword + "'";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }


        [Route("update")]
        [HttpPut]
        public JsonResult update(sys_user_db user)
        {
            user.update_date = DateTime.Now;
            user.update_by = user.id;
            string query = @"Update sys_user set status_del = '" + user.status_del + "'where id ='" + user.id + "'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }


        [Route("xuatExcel")]
        [HttpGet]
        public async Task<FileResult> xuatExcel()
        {

            var ten_nguoi_cap_nhat = "(Select top 1 fullname from sys_user where id = sys_user.update_by) as ten_nguoi_cap_nhat,";
            string query = "Select" + ten_nguoi_cap_nhat +
                "*" + "from sys_user order by  update_date desc";
            var table = _common_repo.Connect(query);
            var filename = "user.xlxs";
            return GenerateExcel(filename,table);
        }
        private FileResult GenerateExcel(string fileName,DataTable? table)
        {
            

            DataTable? dataTable = new DataTable("sys_user");
            for (int j = 0; j < table.Columns.Count; j++)
            {
                string key = Convert.ToString(table.Columns[j]);
                dataTable.Columns.Add(key);
            }

            var row = table.Rows.OfType<DataRow>().Select(q=>q.ItemArray).ToList();
            foreach(var item in row)
            {
                dataTable.Rows.Add(item);
            }

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dataTable);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName);
                }
            }
        }


       

    }
}
