using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_user_model
    {
        public sys_user_model()
        {
            db = new sys_user_db();
            list_user = new List<sys_user_db>();
        }
        public sys_user_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
        public List<sys_user_db>? list_user { get; set; }
    }

    public class data_model
    {
        public List<user_common> data { get; set; }

    }
    public class user_common
    {

        public string? id { get; set; }
        public string? fullname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public int? gender { get; set; }
        public string? address { get; set; }
        public int? status_del { get; set; }
        public string? update_by { get; set; }
        public DateTime? update_date { get; set; }
        public string? avatar { get; set; }
        public string? birthday { get; set; }
    }

    public class user_dang_nhap_model
    {
        public string? id { get; set; }
        public string? email { get; set; }
        public string? hasPassword { get; set; }
    }
}

