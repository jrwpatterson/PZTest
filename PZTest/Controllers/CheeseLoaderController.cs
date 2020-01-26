using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PZTest.Models;

namespace PZTest.Controllers
{
    using PZTest.Interfaces;
    using PZTest.Seed_Data;

    [ApiController]
    [Route("api/[controller]")]
    public class CheeseLoaderController : ControllerBase
    {

        private readonly ILogger<CheeseLoaderController> _logger;

        private readonly IDataCache<CheeseModel> _cheeseCache;

        public CheeseLoaderController(ILogger<CheeseLoaderController> logger, IDataCache<CheeseModel> cheeseCache)
        {
            _logger = logger;
            this._cheeseCache = cheeseCache;
        }

        [HttpGet]
        public IEnumerable<CheeseModel> Get()
        {
            return this._cheeseCache.Read();
        }

        [HttpGet("{id}")]
        public  CheeseModel Get(Guid id)
        {
            return this._cheeseCache.Read(id);
        }
    }
}
