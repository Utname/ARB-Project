using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_phong_ban_model
    {
        public sys_phong_ban_model()
        {
            db = new sys_phong_ban_db();
        }
        public sys_phong_ban_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}