using System;

namespace PZTest.tests.Models
{
    using PZTest.Models;

    using Xunit;

    public class BasketModelTests
    {
        [Fact]
        public void it_should_calculate_its_total()
        {
            // arrange 
            var basket = new BasketModel();
            basket.ID = Guid.NewGuid();
            var basketLine1 = new VerifiedBasketLine();
            var basketLine2 = new VerifiedBasketLine();
            basketLine1.Price = 22.11M;
            basketLine1.Grams = 10;
            basketLine1.RowNo = 0;

            basketLine2.Price = 30.00M;
            basketLine2.Grams = 10;
            basketLine2.RowNo = 1;

            basket.Lines = new VerifiedBasketLine[2] { basketLine1, basketLine2 };

            // assert
            Assert.Equal(2, basket.Lines.Length );
            Assert.Equal(52.11M, basket.Total);
        }

        [Fact]
        public void it_should_calculate_its_total_to_be_zero_when_empty_lines()
        {
            // arrange 
            var basket = new BasketModel();
            basket.ID = Guid.NewGuid();


            // assert
            Assert.Equal( 0M, basket.Total);
        }
    }
}
