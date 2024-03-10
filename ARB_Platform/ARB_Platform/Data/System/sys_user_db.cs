namespace ARB_Platform.Data.System
{
    public class sys_user_db
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
        public DateTime? birthday { get; set; }
        public string? hasPassword { get; set; }
        public string? cover_image { get; set; }
    }
}
