using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ARB_Platform.DataAccess.System
{
    public class sys_user_repo
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public sys_user_repo(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

      
    }


}
