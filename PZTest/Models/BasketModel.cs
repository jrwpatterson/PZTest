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
                return Lines?.Select(a => a.Price)?.Sum() ?? 0M;
            }
        }
    }
}
