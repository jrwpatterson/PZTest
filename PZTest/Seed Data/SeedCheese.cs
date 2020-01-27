using System.Collections.Generic;

using PZTest.Models;

namespace PZTest.Seed_Data
{
    using System;

    /// <summary>
    /// where we seed our cheeses!
    /// </summary>
    public static class SeedCheese
    {
        /// <summary>
        /// Gets the initial seed cheese types
        /// </summary>
        /// <returns>List of cheeses</returns>
        public static List<CheeseModel> GetSeedCheese()
        {
            List<CheeseModel> returnData = new List<CheeseModel>()
                                               {
                                                   new CheeseModel("Gorgonzola", 22.59M, "https://cheese.com/media/img/cheese/Gorgonzola_niUHULx.jpg", "blue",  Guid.Parse("14c42776-a731-4b75-9c59-2dc098f0575a")),
                                                   new CheeseModel("Edam", 20.59M, "https://cheese.com/media/img/cheese/568-edam.jpg", "red",  Guid.Parse("17593bcc-b374-4140-a496-ff9f67c9a57b")),
                                                   new CheeseModel("Cheddar", 14.59M, "https://cheese.com/media/img/cheese/wiki/cheddar.jpg", "yellow",  Guid.Parse("7c0d2297-397b-4039-a9c5-1bf35c0b06fc")),
                                                   new CheeseModel("Brie", 23.39M, "https://cheese.com/media/img/cheese/Brie_PDCo3RG.jpg", "white",  Guid.Parse("e481d6d3-bf51-4fa4-a5c9-1b127abf2bf4")),
                                                   new CheeseModel("Pecorino Romano", 2.59M, "https://cheese.com/media/img/cheese/Pecorino_romano_cheese.jpg", "black",  Guid.Parse("7d12f988-2608-4821-b21f-ab6b354dfc14"))
                                               };

            return returnData;
        }
    }
}
