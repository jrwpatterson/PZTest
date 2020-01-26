using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PZTest.Data
{
    using PZTest.Interfaces;
    using PZTest.Models;

    public class BasketModification
    {
        private readonly IDataCache<CheeseModel> _cheeseCache;

        public BasketModification(IDataCache<CheeseModel> cheeseCache)
        {
            this._cheeseCache = cheeseCache;
        }

        public BasketModification UpdateBasket(UnverifiedBasket basket)
        {
            throw new NotImplementedException();
        }
    }
}
