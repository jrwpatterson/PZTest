using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PZTest.Models
{
    using PZTest.Interfaces;

    public class UnverifiedBasket: IGeneticDataItem
    {
        public Guid ID { get; set; }
        public BaseBasketLine[] Lines { get; set; }
    }
}
