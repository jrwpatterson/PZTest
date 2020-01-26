using System;

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
        private Mock<IBasketModification> basketModifier;

        private Mock<ILogger<BasketController>> mockLogger;
        private BasketController basketController;
        private UnverifiedBasket basket;

        public BasketControllerTests()
        {
            basket = new UnverifiedBasket();
            mockLogger = new Mock<ILogger<BasketController>>();
            basketModifier = new Mock<IBasketModification>();
            basket.ID = Guid.Parse("f3f6b014-df03-495e-a0c5-17ff198a1cff");
            basketController = new BasketController(mockLogger.Object, this.basketModifier.Object);
        }
        [Fact]
        public void it_should_call_the_basket_modifier()
        {
            this.basketController.UpdateBasket(this.basket);
            this.basketModifier.Verify(a => a.UpdateBasket(this.basket));
        }
    }
}
