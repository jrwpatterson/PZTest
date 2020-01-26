using System;
using System.Collections.Generic;
using System.Text;

namespace PZTest.tests.Data
{
    using Moq;

    using PZTest.Data;
    using PZTest.Interfaces;
    using PZTest.Models;
    using PZTest.Seed_Data;

    using Xunit;

    public class BasketModificationTests
    {
        private UnverifiedBasket basket;

        private CheeseInMemCacheClass cheeseCache;

        private BasketModification basketModification;

        public BasketModificationTests()
        {
            basket = new UnverifiedBasket();
            cheeseCache = new CheeseInMemCacheClass();
            basketModification = new BasketModification(cheeseCache);
            basket.ID = Guid.Parse("f3f6b014-df03-495e-a0c5-17ff198a1cff");
        }

        [Fact]
        public void it_should_return_an_empty_basket_if_empty()
        {
            // act
            var newBasket = basketModification.UpdateBasket(basket);

            // assert
            Assert.Empty(newBasket.Lines);
            Assert.Equal(0, newBasket.Total);
            Assert.Equal(basket.ID, newBasket.ID);
        }

        [Fact]
        public void it_should_return_a_valid_basket()
        {
            // arrange
            basket.Lines = new BaseBasketLine[2]
                               {
                                   new BaseBasketLine(){Grams = 200, RowNo = 0, ProductID = Guid.Parse("14c42776-a731-4b75-9c59-2dc098f0575a")}, 
                                   new BaseBasketLine(){Grams = 400, RowNo = 1, ProductID = Guid.Parse("e481d6d3-bf51-4fa4-a5c9-1b127abf2bf4")}
                               };

            // act
            var newBasket = basketModification.UpdateBasket(basket);

            // assert
            Assert.Equal(13.88M, newBasket.Total);
            Assert.Equal(4.52M, newBasket.Lines[0].Price);
            Assert.Equal(9.36M, newBasket.Lines[1].Price);
            Assert.Equal("Gorgonzola", newBasket.Lines[0].Name);
            Assert.Equal("Brie", newBasket.Lines[1].Name);
            Assert.Equal(200, newBasket.Lines[0].Grams);
            Assert.Equal(400, newBasket.Lines[1].Grams);
            Assert.Equal(Guid.Parse("14c42776-a731-4b75-9c59-2dc098f0575a"), newBasket.Lines[0].ProductID);
            Assert.Equal(Guid.Parse("e481d6d3-bf51-4fa4-a5c9-1b127abf2bf4"), newBasket.Lines[1].ProductID);
            Assert.Equal(0, newBasket.Lines[0].RowNo);
            Assert.Equal(1, newBasket.Lines[1].RowNo);
        }

        [Fact]
        public void it_should_remove_items_from_basket_if_not_valid()
        {
            // arrange
            basket.Lines = new BaseBasketLine[3]
                               {
                                   new BaseBasketLine(){Grams = 200, RowNo = 0, ProductID = Guid.Parse("14c42776-a731-4b75-9c59-2dc098f0575a")},
                                   new BaseBasketLine(){Grams = 400, RowNo = 1, ProductID = Guid.Parse("e481d6d3-bf51-4fa4-a5c9-1b127abf2bf4")},
                                   new BaseBasketLine(){Grams = 300, RowNo = 2, ProductID = Guid.Parse("e481d6d3-bf51-4fa4-a5c9-1b127abf2bf5")}
                               };

            // act
            var newBasket = basketModification.UpdateBasket(basket);

            // assert
            Assert.Equal(2, newBasket.Lines.Length);
            Assert.Equal("Gorgonzola", newBasket.Lines[0].Name);
            Assert.Equal("Brie", newBasket.Lines[1].Name);
        }
    }
}
