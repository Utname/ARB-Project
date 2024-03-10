using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_chuc_danh_model
    {
        public sys_chuc_danh_model()
        {
            db = new sys_chuc_danh_db();
        }
        public sys_chuc_danh_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}