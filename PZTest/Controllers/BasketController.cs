using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PZTest.Controllers
{
    using PZTest.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        [HttpPost]
        public BasketModel UpdateBasket(UnverifiedBasket basket)
        {
            throw new NotImplementedException();
        }
    }
}