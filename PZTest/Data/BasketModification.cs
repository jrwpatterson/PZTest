using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PZTest.Data
{
    using PZTest.Interfaces;
    using PZTest.Models;

    public class BasketModification: IBasketModification
    {
        private readonly IDataCache<CheeseModel> _cheeseCache;

        public BasketModification(IDataCache<CheeseModel> cheeseCache)
        {
            this._cheeseCache = cheeseCache;
        }

        public BasketModel UpdateBasket(UnverifiedBasket basket)
        {
            var newBasket = new BasketModel();
            newBasket.ID = basket.ID;

            var newLines = new List<VerifiedBasketLine>();

            if (basket.Lines?.Length > 0)
            {
                foreach (var basketLine in basket.Lines)
                {
                    var cheese = this._cheeseCache.Read(basketLine.ProductID);
                    if (cheese != null)
                    {
                        var line = new VerifiedBasketLine();
                        line.Grams = basketLine.Grams;
                        line.Name = cheese.Name;
                        line.RowNo = basketLine.RowNo;
                        line.Price = (basketLine.Grams * cheese.PricePerKG) / 1000;
                        line.ProductID = cheese.ID;

                        newLines.Add(line);
                    }
                }
            }

            newBasket.Lines = newLines.ToArray();

            return newBasket;
        }
    }
}
