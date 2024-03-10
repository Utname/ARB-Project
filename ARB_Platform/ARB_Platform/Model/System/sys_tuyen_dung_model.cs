using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_tuyen_dung_model
    {
        public sys_tuyen_dung_model()
        {
            db = new sys_tuyen_dung_db();
        }
        public sys_tuyen_dung_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
   
}

