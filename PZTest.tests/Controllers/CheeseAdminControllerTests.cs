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
    using PZTest.Seed_Data;

    using Xunit;

    public class CheeseAdminControllerTests
    {
        [Fact]
        public void it_should_delete_a_record()
        {
            // arrange
            var mockLogger = new Mock<ILogger<CheeseAdminController>>();
            var cheeseCache = new Mock<IDataCache<CheeseModel>>();  
            var cheeseController = new CheeseAdminController(mockLogger.Object, cheeseCache.Object);

            // act
            var id = Guid.NewGuid();
            cheeseController.Delete(id);

            // assert 
            cheeseCache.Verify(m => m.Delete(id));  
        }


        [Fact]
        public void it_should_update_a_record()
        {
            // arrange
            var mockLogger = new Mock<ILogger<CheeseAdminController>>();
            var cheeseCache = new Mock<IDataCache<CheeseModel>>();
            var cheeseController = new CheeseAdminController(mockLogger.Object, cheeseCache.Object);

            // act
            var cheese = new CheeseModel("cheese model", 1M, "testURl", "blue");
            cheeseController.Put(cheese);

            // assert 
            cheeseCache.Verify(m => m.Update(cheese));
        }


        [Fact]
        public void it_should_create_a_record()
        {
            // arrange
            var mockLogger = new Mock<ILogger<CheeseAdminController>>();
            var cheeseCache = new Mock<IDataCache<CheeseModel>>();
            var cheeseController = new CheeseAdminController(mockLogger.Object, cheeseCache.Object);

            // act
            var cheese = new CheeseModel("cheese model", 1M, "testURl", "blue");
            cheeseController.Post(cheese);

            // assert 
            cheeseCache.Verify(m => m.Create(It.Is<CheeseModel>(i => i.Name == cheese.Name && i.CheeseColour == cheese.CheeseColour && i.PricePerKG == cheese.PricePerKG && i.PictureUrl == cheese.PictureUrl)));
        }
    }
}
