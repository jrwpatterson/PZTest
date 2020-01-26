using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PZTest.Controllers
{
    using Microsoft.Extensions.Logging;

    using PZTest.Interfaces;
    using PZTest.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {

        private readonly ILogger<BasketController> _logger;

        private readonly IDataCache<CheeseModel> _cheeseCache;

        public BasketController(ILogger<BasketController> logger, IDataCache<CheeseModel> cheeseCache)
        {
            _logger = logger;
            this._cheeseCache = cheeseCache;
        }

        [HttpPost]
        public BasketModel UpdateBasket(UnverifiedBasket basket)
        {
            throw new NotImplementedException();
        }
    }
}