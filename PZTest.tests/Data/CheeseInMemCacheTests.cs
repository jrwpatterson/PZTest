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
            Assert.Equal(cheeseMemory.Read().Length, 5);
            Assert.Equal(cheeseMemory.Read()[0].CheeseColour, "blue");
            Assert.Equal(cheeseMemory.Read()[0].Name, "Gorgonzola");
            Assert.Equal(cheeseMemory.Read()[0].PictureUrl, "test");
            Assert.Equal(cheeseMemory.Read()[0].PricePerKG, 22.59M);
        }


        [Fact]
        public void it_should_read()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();

            var id = cheeseMemory.Read()[0].ID;

            var pieceOfCheese = cheeseMemory.Read(id);

            // assert
            Assert.Equal(pieceOfCheese.CheeseColour, "blue");
            Assert.Equal(pieceOfCheese.Name, "Gorgonzola");
            Assert.Equal(pieceOfCheese.PictureUrl, "test");
            Assert.Equal(pieceOfCheese.PricePerKG, 22.59M);
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
            Assert.Equal(cheeseMemory.Read().Length, 6);
            Assert.Equal(cheeseMemory.Read()[5].Name, "special test cheese");
            Assert.Equal(cheeseMemory.Read()[5].CheeseColour, "purple");
            Assert.Equal(cheeseMemory.Read()[5].PictureUrl, "A test url");
            Assert.Equal(cheeseMemory.Read()[5].PricePerKG, 1.5M);
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
            Assert.Equal(cheeseMemory.Read().Length, 4);
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
            Assert.Equal(cheeseMemory.Read().Length, 4);
            Assert.Null(cheeseMemory.Read(cheeseToDelete.ID));
        }

        [Fact]
        public void it_should_update()
        {
            // arrange 
            var cheeseMemory = new CheeseInMemCacheClass();
            Assert.Equal(cheeseMemory.Read()[2].CheeseColour, "yellow");
            Assert.Equal(cheeseMemory.Read()[2].Name, "Cheddar");
            Assert.Equal(cheeseMemory.Read()[2].PictureUrl, "test");
            Assert.Equal(cheeseMemory.Read()[2].PricePerKG, 14.59M);


            // act 
            var cheeseToChange = cheeseMemory.Read()[2];
            cheeseToChange.Name = "test name";
            cheeseMemory.Update(cheeseToChange);

            // assert
            Assert.Equal(cheeseMemory.Read().Length, 5);
            Assert.Equal(cheeseMemory.Read()[2].CheeseColour, "yellow");
            Assert.Equal(cheeseMemory.Read()[2].Name, "test name");
            Assert.Equal(cheeseMemory.Read()[2].PictureUrl, "test");
            Assert.Equal(cheeseMemory.Read()[2].PricePerKG, 14.59M);
        }
    }
}
