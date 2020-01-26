using Xunit;
using PZTest.Data;
using PZTest.Models;

namespace PZTest.tests
{

    public class CheeseInMemoryTests
    {
        [Fact]
        public void it_should_get_the_seed_data_if_nothing_exists()
        { 
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            // assert
            Assert.Equal(5, cheeseMemory.Read().Length);
            Assert.Equal("blue", cheeseMemory.Read()[0].CheeseColour);
            Assert.Equal("Gorgonzola", cheeseMemory.Read()[0].Name);
            Assert.Equal("test", cheeseMemory.Read()[0].PictureUrl);
            Assert.Equal(22.59M, cheeseMemory.Read()[0].PricePerKG);
        }


        [Fact]
        public void it_should_read()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            var id = cheeseMemory.Read()[0].ID;

            var pieceOfCheese = cheeseMemory.Read(id);

            // assert
            Assert.Equal("blue", pieceOfCheese.CheeseColour);
            Assert.Equal("Gorgonzola", pieceOfCheese.Name);
            Assert.Equal("test", pieceOfCheese.PictureUrl);
            Assert.Equal(22.59M, pieceOfCheese.PricePerKG);
        }



        [Fact]
        public void it_should_create_an_item()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            //act
            var newCheese = new CheeseModel("special test cheese", 1.5M, "A test url", "purple");
            cheeseMemory.Create(newCheese);

            // assert
            Assert.Equal(6, cheeseMemory.Read().Length);
            Assert.Equal("special test cheese", cheeseMemory.Read()[5].Name);
            Assert.Equal("purple", cheeseMemory.Read()[5].CheeseColour);
            Assert.Equal("A test url", cheeseMemory.Read()[5].PictureUrl);
            Assert.Equal(1.5M, cheeseMemory.Read()[5].PricePerKG);
        }

        [Fact]
        public void it_should_delete_an_item()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            //act
            var cheeseToDelete = cheeseMemory.Read()[2];
            cheeseMemory.Delete(cheeseToDelete.ID);

            // assert
            Assert.Equal(4, cheeseMemory.Read().Length);
            Assert.Null(cheeseMemory.Read(cheeseToDelete.ID));
        }

        [Fact]
        public void it_should_delete_an_item_when_using_whole_item()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            //act
            var cheeseToDelete = cheeseMemory.Read()[2];
            cheeseMemory.Delete(cheeseToDelete);

            // assert
            Assert.Equal(4, cheeseMemory.Read().Length);
            Assert.Null(cheeseMemory.Read(cheeseToDelete.ID));
        }

        [Fact]
        public void it_should_update()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();
            Assert.Equal("yellow", cheeseMemory.Read()[2].CheeseColour);
            Assert.Equal("Cheddar", cheeseMemory.Read()[2].Name);
            Assert.Equal("test", cheeseMemory.Read()[2].PictureUrl);
            Assert.Equal(14.59M, cheeseMemory.Read()[2].PricePerKG);


            // act 
            var cheeseToChange = cheeseMemory.Read()[2];
            cheeseToChange.Name = "test name";
            cheeseMemory.Update(cheeseToChange);

            // assert
            Assert.Equal(5, cheeseMemory.Read().Length);
            Assert.Equal("yellow", cheeseMemory.Read()[2].CheeseColour);
            Assert.Equal("test name", cheeseMemory.Read()[2].Name);
            Assert.Equal("test", cheeseMemory.Read()[2].PictureUrl);
            Assert.Equal(14.59M, cheeseMemory.Read()[2].PricePerKG);
        }
    }
}
