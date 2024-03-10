using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_quan_tri_model
    {
        public sys_quan_tri_model()
        {
            db = new sys_quan_tri_db();
        }
        public sys_quan_tri_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? id_user { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}