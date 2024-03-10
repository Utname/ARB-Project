using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_loai_san_pham_model
    {
        public sys_loai_san_pham_model()
        {
            db = new sys_loai_san_pham_db();
        }
        public sys_loai_san_pham_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}