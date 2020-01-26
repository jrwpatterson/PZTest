using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PZTest.Interfaces
{
    using PZTest.Models;

    interface IBasketModification
    {
        BasketModel UpdateBasket(UnverifiedBasket basket);
    }
}
