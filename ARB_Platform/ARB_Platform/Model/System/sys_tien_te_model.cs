using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_tien_te_model
    {
        public sys_tien_te_model()
        {
            db = new sys_tien_te_db();
        }
        public sys_tien_te_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}