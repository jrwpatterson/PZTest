using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PZTest.Models
{
    using PZTest.Interfaces;

    public class BasketModel:IGeneticDataItem
    {
        public Guid ID { get; set; }

        public VerifiedBasketLine[] Lines { get; set; }

        public decimal Total
        {
            get
            {
                return Lines?.Select(a => Math.Round(a.Price, 2, MidpointRounding.AwayFromZero))?.Sum() ?? 0M;
            }
        }
    }
}
