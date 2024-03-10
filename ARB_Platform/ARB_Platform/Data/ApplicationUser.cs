using Microsoft.AspNetCore.Identity;

namespace ARB_Platform.Data
{
    public class ApplicationUser : IdentityUser {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
