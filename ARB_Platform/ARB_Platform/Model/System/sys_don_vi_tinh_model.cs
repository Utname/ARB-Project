using ARB_Platform.Data.System;

namespace ARB_Platform.Model.System
{
    public class sys_don_vi_tinh_model
    {
        public sys_don_vi_tinh_model()
        {
            db = new sys_don_vi_tinh_db();
        }
        public sys_don_vi_tinh_db db { get; set; }
        public string? search { get; set; }
        public int? status_del { get; set; }
        public string? ten_nguoi_cap_nhat { get; set; }
    }
}