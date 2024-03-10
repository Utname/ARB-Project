using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_tin_tuc_model
    {
        public sys_tin_tuc_model()
        {
            db = new sys_tin_tuc_db();
        }
        public sys_tin_tuc_db db { get; set; }
        public string? search { get; set; }
        public string? id_nhom_tin_tuc { get; set; }
        public string? id_loai_tin_tuc { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}