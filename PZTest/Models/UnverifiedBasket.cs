using System;

namespace PZTest.Models
{
    using PZTest.Interfaces;

    public class UnverifiedBasket: IGeneticDataItem
    {
        public Guid ID { get; set; }
        public BaseBasketLine[] Lines { get; set; }
    }
}
