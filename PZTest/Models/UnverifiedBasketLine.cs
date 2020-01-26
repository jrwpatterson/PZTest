namespace PZTest.Models
{
    using System;

    public class BaseBasketLine
    {
        public Guid ProductID { get; set; }
        public int RowNo { get; set; }
        public int Grams { get; set; }
    }
}