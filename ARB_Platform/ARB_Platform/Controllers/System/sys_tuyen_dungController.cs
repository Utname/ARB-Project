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
    public class sys_tuyen_dungController : ControllerBase
    {
        //private phạm vi truy cập của class đó;
        //readonly không thể thay đổi giá trị;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private common_repo _common_repo;
        public sys_tuyen_dungController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _common_repo = new common_repo(configuration, env); 
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "Select * from sys_tuyen_dung where status_del = 1  order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }

        [Route("getAll")]
        [HttpPost]
        public JsonResult getAll(sys_tuyen_dung_model db)
        {
            var ten_nguoi_cap_nhat = "(Select top 1 fullname from sys_user where id = sys_tuyen_dung.update_by and status_del = 1) as ten_nguoi_cap_nhat,";
            var ten_don_vi_tinh = "(Select top 1 ten from sys_nhom_tin_tuc where id = sys_tuyen_dung.id_don_vi_tinh and status_del = 1) as ten_don_vi_tinh,";
            string query = "Select" + ten_nguoi_cap_nhat + ten_don_vi_tinh + "* from sys_tuyen_dung where status_del = '"+ db.status_del+"' and " +
                "(ten LIKE '%"+ db.search+"%'  or ma LIKE '%" + db.search + "%')   " +
                "order by  update_date desc";
            var table = _common_repo.Connect(query);
            return new JsonResult(table);
        }
  

        [HttpPost]
        public JsonResult Post(sys_tuyen_dung_db db)
        {
            var check = checkModelStateCreate(db);
            //if (!check)
            //{
            //    return generateError();
            //}
            //db.hasPassword = BCrypt.Net.BCrypt.HashPassword(db.hasPassword);
            db.update_date = DateTime.Now;
            db.id = Guid.NewGuid().ToString();
            db.status_del = 1;
            string query = @"Insert into sys_tuyen_dung values (
                '" + db.id + "',N'" + db.ma + "',N'" + db.ten + "','" + db.id_cong_ty + "','" + db.id_phong_ban + "'," +
                "'" + db.id_chuc_danh + "','" + db.id_phuc_loi + "',N'" + db.titile + "',N'" + db.mo_ta + "','" + db.so_luong + "'," +
                "'" + db.id_loai_luong + "','" + db.luong_from + "','" + db.luong_to + "',N'" + db.id_don_vi_tinh + "',N'" + db.id_hinh_thuc_lam_viec + "',N'" + db.id_gioi_tinh + "','" + db.id_bang_cap + "'," +
                "'" + db.ngay_bat_dau + "','" + db.ngay_het_han + "','" + db.update_by + "','" + db.update_date + "','" + db.status_del + "',N'" + db.yeu_cau + "',N'" + db.mo_ta_cong_ty + "',N'" + db.image + "')";
             _common_repo.Connect(query);
            return new JsonResult("Thêm mới thành công");
        }
        private bool checkModelStateCreate(sys_tuyen_dung_db model)
        {
            if (string.IsNullOrEmpty(model.ma))
            {
                ModelState.AddModelError("fullname", "required");
            }
            return ModelState.IsValid;
        }

        [HttpPut]
        public JsonResult Put(sys_tuyen_dung_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_tuyen_dung set ma = N'"+ db.ma + "',id_cong_ty = '" + db.id_cong_ty + "',ten = N'" + db.ten + "'" +
             ",id_phong_ban = '" + db.id_phong_ban + "',id_chuc_danh = N'" + db.id_chuc_danh + "',id_phuc_loi = N'" + db.id_phuc_loi + "'" +
              ",so_luong = '" + db.so_luong + "',id_loai_luong = N'" + db.id_loai_luong + "',luong_from = N'" + db.luong_from + "'" +
              ",luong_to = '" + db.luong_to + "',id_don_vi_tinh = N'" + db.id_don_vi_tinh + "',id_hinh_thuc_lam_viec = N'" + db.id_hinh_thuc_lam_viec + "'" +
             ",titile = N'" + db.titile + "',mo_ta = N'" + db.mo_ta + "',yeu_cau = N'" + db.yeu_cau + "'" +
             ",update_by = '" + db.update_by + "',update_date = N'" + db.update_date + "',status_del = N'" + db.status_del + "'" +
             ",id_gioi_tinh = N'" + db.id_gioi_tinh + "',id_bang_cap = N'" + db.id_bang_cap + "',ngay_bat_dau = N'" + db.ngay_bat_dau + "',ngay_het_han = N'" + db.ngay_het_han + "',mo_ta_cong_ty = N'" + db.mo_ta_cong_ty + "',image = N'" + db.image + "'"
            + "where id ='"+ db.id+"'";

            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }



        [Route("update")]
        [HttpPut]
        public JsonResult update(sys_tuyen_dung_db db)
        {
            db.update_date = DateTime.Now;
            string query = @"Update sys_tuyen_dung set status_del = '" + db.status_del + "'where id ='" + db.id + "'";
            _common_repo.Connect(query);
            return new JsonResult("Cập nhật thành công");
        }
    }
}
