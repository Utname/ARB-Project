﻿using Microsoft.AspNetCore.Http;
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
    public class sys_phong_banController : commonController
    {
        //private phạm vi truy cập của class đó;
        //readonly không thể thay đổi giá trị;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private common_repo _common_repo;
        public sys_phong_banController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _common_repo = new common_repo(configuration, env);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "Select * from sys_phong_ban where status_del = 1  order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [Route("getAll")]
        [HttpPost]
        public JsonResult getAll(sys_phong_ban_model model)
        {
            var ten_nguoi_cap_nhat = "(Select top 1 fullname from sys_user where id = sys_phong_ban.update_by) as ten_nguoi_cap_nhat,";
            string query = "Select"+ ten_nguoi_cap_nhat +" * from sys_phong_ban where status_del = '"+ model.status_del+"' and " +
                "(ten LIKE '%"+ model.search+"%' or ma LIKE '%"+ model.search+"%')" +
                "order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
  

        [HttpPost]
        public JsonResult Post(sys_phong_ban_db db)
        {

            var check = checkModelStateCreate(db);
            if (!check)
            {
                return generateError();
            }
            db.update_date = DateTime.Now;
            db.id = Guid.NewGuid().ToString();
            db.status_del = 1;
            string query = @"Insert into sys_phong_ban values (
                '" + db.id + "',N'" + db.ma + "',N'" + db.ten + "',N'" + db.ghi_chu + "'," +
                "N'" + db.update_by + "','" + db.update_date + "','" + db.status_del + "')";
            _common_repo.Connect(query);
            return new JsonResult("Thêm mới thành công");
        }

        [Route("getListUse")]
        [HttpPost]
        public JsonResult getListUse(sys_cong_ty_db db)
        {
            string query = "Select id,ten as name from sys_phong_ban where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(sys_phong_ban_db db)
        {
            var check = checkModelStateCreate(db);
            if (!check)
            {
                return generateError();
            }
            db.update_date = DateTime.Now;
            string query = @"Update sys_phong_ban set ma = N'"+ db.ma+"',ten = N'"+ db.ten+"'" +
             ",ghi_chu = N'"+ db.ghi_chu + "',update_date = N'"+ db.update_date + "',update_by = N'"+ db.update_by + "'" +
             ",status_del = N'"+ db.status_del + "'"
               + "where id ='" + db.id + "'"; ;

            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }
        private bool checkModelStateCreate(sys_phong_ban_db model)
        {
            if (string.IsNullOrEmpty(model.ma))
            {
                ModelState.AddModelError("ma", "requied");
            }
            if (string.IsNullOrEmpty(model.ten))
            {
                ModelState.AddModelError("ten", "requied");
            }
            return ModelState.IsValid;
        }

        [Route("update")]
        [HttpPut]
        public JsonResult update(sys_phong_ban_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_phong_ban set status_del = '" + db.status_del + "'where id ='" + db.id + "'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }
    }
}
