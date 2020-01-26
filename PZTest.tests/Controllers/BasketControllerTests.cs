using System;
using System.Collections.Generic;
using System.Text;

namespace PZTest.tests.Controllers
{
    using Microsoft.Extensions.Logging;

    using Moq;

    using PZTest.Controllers;
    using PZTest.Interfaces;
    using PZTest.Models;

    using Xunit;

    public class BasketControllerTests
    {
        private Mock<IDataCache<CheeseModel>> cheeseCache;

        private Mock<ILogger<BasketController>> mockLogger;
        private BasketController basketController;
        private UnverifiedBasket basket;

        public BasketControllerTests()
        {
            basket = new UnverifiedBasket();
            mockLogger = new Mock<ILogger<BasketController>>();
            cheeseCache = new Mock<IDataCache<CheeseModel>>();
            basket.ID = Guid.Parse("f3f6b014-df03-495e-a0c5-17ff198a1cff");
            basketController = new BasketController(mockLogger.Object, cheeseCache.Object);
        }
        [Fact]
        public void it_should_call_the_basket_modifier()
        {
            this.basketController.UpdateBasket(this.basket);
            this.cheeseCache.Verify(a => a.Read());
        }
    }
}
