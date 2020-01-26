using Xunit;
using Moq;
using PZTest.Controllers;
using Microsoft.Extensions.Logging;
using PZTest.Interfaces;
using PZTest.Models;

namespace PZTest.tests.Controllers
{
    using PZTest.Seed_Data;

    public class CheeseLoaderControllerTests
    {
        [Fact]
        public void it_should_return_seeded_data()
        {
            // arrange
            var mockLogger = new Mock<ILogger<CheeseLoaderController>>();
            var cheeseCache = new Mock<IDataCache<CheeseModel>>();
            var seedCheeses = SeedCheese.GetSeedCheese().ToArray();
            cheeseCache.Setup(a => a.Read()).Returns(seedCheeses);
            var cheeseController = new CheeseLoaderController(mockLogger.Object, cheeseCache.Object);

            // act
            var cheeseResponse = cheeseController.Get();

            // assert 
            Assert.Equal(seedCheeses, cheeseResponse);
        }


        [Fact]
        public void it_should_return_seeded_data_with_id()
        {
            // arrange
            var mockLogger = new Mock<ILogger<CheeseLoaderController>>();
            var cheeseCache = new Mock<IDataCache<CheeseModel>>();
            var seedCheeses = SeedCheese.GetSeedCheese().ToArray();
            cheeseCache.Setup(a => a.Read(seedCheeses[2].ID)).Returns(seedCheeses[2]);
            var cheeseController = new CheeseLoaderController(mockLogger.Object, cheeseCache.Object);

            // act
            var cheeseResponse = cheeseController.Get(seedCheeses[2].ID);

            // assert 
            Assert.Equal(seedCheeses[2], cheeseResponse);
        }
    }
}
