using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_phuc_loi_model
    {
        public sys_phuc_loi_model()
        {
            db = new sys_phuc_loi_db();
        }
        public sys_phuc_loi_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}