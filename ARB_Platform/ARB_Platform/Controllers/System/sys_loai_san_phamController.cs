using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ARB_Platform.Data.System;
using ARB_Platform.Model.System;
using System.Linq;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Reflection;
using ARB_Platform.Common.DataAccess;

namespace ARB_Platform.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    public class sys_loai_san_phamController : ControllerBase
    {
        //private phạm vi truy cập của class đó;
        //readonly không thể thay đổi giá trị;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private common_repo _common_repo;
        public sys_loai_san_phamController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _common_repo = new common_repo(configuration, env);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "Select id,ten from sys_loai_san_pham where status_del = 1  order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [Route("getAll")]
        [HttpPost]
        public JsonResult getAll(sys_loai_san_pham_model model)
        {
            string query = "Select * from sys_loai_san_pham where status_del = '"+ model.status_del+"' and " +
                "(ten LIKE '%"+ model.search+"%' or ma LIKE '%"+ model.search+"%')" +
                "order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
  

        [HttpPost]
        public JsonResult Post(sys_loai_san_pham_db db)
        {

            //if (!check)
            //{
            //    return generateError();
            //}
            //chuc_danh.hasPassword = BCrypt.Net.BCrypt.HashPassword(chuc_danh.hasPassword);
            db.update_date = DateTime.Now;
            db.id = Guid.NewGuid().ToString();
            db.status_del = 1;
            string query = @"Insert into sys_loai_san_pham values (
                '" + db.id + "',N'" + db.ma + "',N'" + db.ten + "',N'" + db.ghi_chu + "'," +
                "N'" + db.update_by + "','" + db.update_date + "','" + db.status_del + "')";
            _common_repo.Connect(query);
            return new JsonResult("Thêm mới thành công");
        }


        [HttpPut]
        public JsonResult Put(sys_loai_san_pham_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_loai_san_pham set ma = N'"+ db.ma+"',ten = N'"+ db.ten+"'" +
             ",ghi_chu = N'"+ db.ghi_chu + "',update_date = N'"+db.update_date + "',update_by = N'"+db.update_by + "'" +
             ",status_del = N'"+db.status_del + "'"
               + "where id ='" + db.id + "'"; ;

            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }


        [Route("getOfList")]
        [HttpPost]
        public JsonResult getOfList(sys_loai_san_pham_db db)
        {
            string query = "Select id, ten from sys_loai_san_pham where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }


        [Route("getListUse")]
        [HttpPost]
        public JsonResult getListUse(sys_loai_san_pham_db db)
        {
            string query = "Select id,ten as name from sys_loai_san_pham where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
        [Route("update")]
        [HttpPut]
        public JsonResult update(sys_loai_san_pham_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_loai_san_pham set status_del = '" + db.status_del + "'where id ='" + db.id + "'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }
    }
}
