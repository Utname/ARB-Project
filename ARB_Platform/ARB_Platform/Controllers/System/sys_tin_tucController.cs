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
    public class sys_tin_tucController : commonController
    {
        //private phạm vi truy cập của class đó;
        //readonly không thể thay đổi giá trị;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private common_repo _common_repo;
        public sys_tin_tucController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _common_repo = new common_repo(configuration, env);
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "Select id,tieu_de from sys_tin_tuc where status_del = 1  order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [Route("getAll")]
        [HttpPost]
        public JsonResult getAll(sys_tin_tuc_model model)
        {
            var ten_nguoi_cap_nhat = "(Select top 1 fullname from sys_user where id = sys_tin_tuc.update_by and status_del = 1) as ten_nguoi_cap_nhat,";
            var ten_nhom_tin_tuc = "(Select top 1 ten from sys_nhom_tin_tuc where id = sys_tin_tuc.id_nhom_tin_tuc and status_del = 1) as ten_nhom_tin_tuc,";
            var ten_loai_tin_tuc = "(Select top 1 ten from sys_loai_tin_tuc where id = sys_tin_tuc.id_loai_tin_tuc and status_del = 1) as ten_loai_tin_tuc,";
            string query = "Select"+ ten_nguoi_cap_nhat + ten_nhom_tin_tuc + ten_loai_tin_tuc + "* from sys_tin_tuc where status_del = '"+ model.status_del+"' and " +
                "(tom_tat LIKE '%" + model.search+"%' or tieu_de LIKE '%"+ model.search+"%')" +
                "order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
  

        [HttpPost]
        public JsonResult Post(sys_tin_tuc_db db)
        {

            var check = checkModelStateCreate(db);
            if (!check)
            {
                return generateError();
            }
            db.update_date = DateTime.Now;
            db.id = Guid.NewGuid().ToString();
            db.status_del = 1;
            string query = @"Insert into sys_tin_tuc values (
                '" + db.id + "',N'" + db.tieu_de + "',N'" + db.tom_tat + "',N'" + db.nguon_tin_tuc + "'," +
                "'" + db.ngay_dang + "',N'" + db.id_nhom_tin_tuc + "',N'" + db.id_loai_tin_tuc + "'," +
                "'" + db.is_comment + "',N'" + db.image + "',N'" + db.noi_dung + "'," +
                "N'" + db.update_by + "','" + db.update_date + "','" + db.status_del + "')";
            _common_repo.Connect(query);
            return new JsonResult("Thêm mới thành công");
        }


        [HttpPut]
        public JsonResult Put(sys_tin_tuc_db db)
        {
            var check = checkModelStateCreate(db);
            if (!check)
            {
                return generateError();
            }
            db.update_date = DateTime.Now;
            string query = @"Update sys_tin_tuc set tieu_de = N'" + db.tieu_de + "',tom_tat = N'" + db.tom_tat + "'" +
             ",nguon_tin_tuc = N'" + db.nguon_tin_tuc + "',ngay_dang = '" + db.ngay_dang + "',id_nhom_tin_tuc = N'" + db.id_nhom_tin_tuc + "'" +
              ",id_loai_tin_tuc = N'" + db.id_loai_tin_tuc + "',is_comment = '" + db.is_comment + "',noi_dung = '" + db.noi_dung + "',image = N'" + db.image + "'" +
             ",update_date = N'" +db.update_date + "',update_by = N'"+db.update_by + "'" +
             ",status_del = N'"+db.status_del + "'"
               + "where id ='" + db.id + "'"; ;

            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }

        private bool checkModelStateCreate(sys_tin_tuc_db model)
        {
            if (string.IsNullOrEmpty(model.tieu_de))
            {
                ModelState.AddModelError("tieu_de", "requied");
            }
            if (string.IsNullOrEmpty(model.id_loai_tin_tuc))
            {
                ModelState.AddModelError("id_loai_tin_tuc", "requied");
            }
            if (string.IsNullOrEmpty(model.id_nhom_tin_tuc))
            {
                ModelState.AddModelError("id_nhom_tin_tuc", "requied");
            }
            if (model.ngay_dang == null)
            {
                ModelState.AddModelError("ngay_dang", "requied");
            }


            return ModelState.IsValid;
        }


        [Route("getOfList")]
        [HttpPost]
        public JsonResult getOfList(sys_tin_tuc_db db)
        {
            string query = "Select id, ten from sys_tin_tuc where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }


        [Route("getListUse")]
        [HttpPost]
        public JsonResult getListUse(sys_tin_tuc_db db)
        {
            string query = "Select id,ten as name from sys_tin_tuc where status_del = 1";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
        [Route("update")]
        [HttpPut]
        public JsonResult update(sys_tin_tuc_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_tin_tuc set status_del = '" + db.status_del + "'where id ='" + db.id + "'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }
    }
}
