namespace PZTest.Interfaces
{
    using PZTest.Models;

    public interface IBasketModification
    {
       BasketModel UpdateBasket(UnverifiedBasket basket);
    }
}
