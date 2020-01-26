namespace PZTest.Models
{
    public class BaseBasketLine
    {
        public int RowNo { get; set; }
        public int Grams { get; set; }
    }

    public class VerifiedBasketLine: BaseBasketLine
    {
        public decimal Price { get; set; }
    }
}