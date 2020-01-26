using System;

namespace PZTest.tests.Controllers
{
    using Microsoft.Extensions.Logging;

    using Moq;

    using PZTest.Controllers;
    using PZTest.Interfaces;
    using PZTest.Models;

    using Xunit;

    public class CheeseAdminControllerTests
    {
        private Mock<IDataCache<CheeseModel>> cheeseCache;

        private Mock<ILogger<CheeseAdminController>> mockLogger;
        private CheeseAdminController cheeseController;

        public CheeseAdminControllerTests()
        {
            mockLogger = new Mock<ILogger<CheeseAdminController>>();
            cheeseCache = new Mock<IDataCache<CheeseModel>>();
            cheeseController = new CheeseAdminController(mockLogger.Object, cheeseCache.Object);
        }

        [Fact]
        public void it_should_delete_a_record()
        {
            // act
            var id = Guid.NewGuid();
            cheeseController.Delete(id);

            // assert 
            cheeseCache.Verify(m => m.Delete(id));  
        }


        [Fact]
        public void it_should_update_a_record()
        {
            // act
            var cheese = new CheeseModel("cheese model", 1M, "testURl", "blue");
            cheeseController.Put(cheese);

            // assert 
            cheeseCache.Verify(m => m.Update(cheese));
        }


        [Fact]
        public void it_should_create_a_record()
        {
            // act
            var cheese = new CheeseModel("cheese model", 1M, "testURl", "blue");
            cheeseController.Post(cheese);

            // assert 
            cheeseCache.Verify(m => m.Create(It.Is<CheeseModel>(i => i.Name == cheese.Name && i.CheeseColour == cheese.CheeseColour && i.PricePerKG == cheese.PricePerKG && i.PictureUrl == cheese.PictureUrl)));
        }
    }
}
