using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogDemo.Api.Models;

namespace ProductCatalogDemo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ProductContext _context;

        public UserController(ProductContext context)
        {
            _context = context;
        }

        [HttpPost]
        public bool PostUser()
        {
            Request.Headers.TryGetValue("loginQt", out var header);
            return true;
        }
    }
}