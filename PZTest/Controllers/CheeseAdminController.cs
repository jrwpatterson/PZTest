using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PZTest.Models;

namespace PZTest.Controllers
{
    using PZTest.Interfaces;

    [ApiController]
    [Route("api/[controller]")]
    public class CheeseAdminController : ControllerBase
    {

        private readonly ILogger<CheeseAdminController> _logger;

        private readonly IDataCache<CheeseModel> _cheeseCache;

        public CheeseAdminController(ILogger<CheeseAdminController> logger, IDataCache<CheeseModel> cheeseCache)
        {
            _logger = logger;
            this._cheeseCache = cheeseCache;
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            this._cheeseCache.Delete(id);
        }

        [HttpPut]
        public void Put(CheeseModel cheese)
        {
            this._cheeseCache.Update(cheese);
        }

        [HttpPost]
        public void Post(CheeseModelNoID cheese)
        {
            var newCheese = new CheeseModel(cheese);
            this._cheeseCache.Create(newCheese);
        }
    }
}