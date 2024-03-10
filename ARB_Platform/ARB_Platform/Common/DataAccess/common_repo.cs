using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ARB_Platform.Data.System;
using ARB_Platform.Model.System;
using ARB_Platform.DataAccess.System;
using System.Linq;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using System.Collections;
using System;
using ARB_Platform.Common.DataAccess;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ARB_Platform.Common.DataAccess
{
    public class common_repo : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private string _cofig;
       
        public common_repo(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _cofig = _configuration.GetConnectionString("ARB_Platform");
        }

        public DataTable Connect(string query)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _cofig;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return table;

        }
        public JsonResult generateError()
        {
            Response.StatusCode = 400;
            var errorList = ModelState.Where(x => x.Value != null).ToList().Where(d => d.Value.Errors.Count() > 0)
            .Select(kvp => new
            {
                key = kvp.Key,
                value = kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            }).ToList();
            return Json(errorList);
        }
    }

   

}
