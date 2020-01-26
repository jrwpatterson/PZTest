using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PZTest.Models;

namespace PZTest.Controllers
{
    using PZTest.Seed_Data;

    [ApiController]
    [Route("api/[controller]")]
    public class CheeseLoaderController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<CheeseLoaderController> _logger;

        public CheeseLoaderController(ILogger<CheeseLoaderController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<CheeseModel> Get()
        {
            return SeedCheese.GetSeedCheese()
            .ToArray();
        }
    }
}
