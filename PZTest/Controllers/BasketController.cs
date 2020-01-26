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
        
        private readonly IBasketModification _basketModification;

        public BasketController(ILogger<BasketController> logger, IBasketModification basketModification)
        {
            _logger = logger;
            this._basketModification = basketModification;
        }

        [HttpPost]
        public BasketModel UpdateBasket(UnverifiedBasket basket)
        {
            return this._basketModification.UpdateBasket(basket);
        }
    }
}