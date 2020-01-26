using System.Collections.Generic;

using PZTest.Models;

namespace PZTest.Seed_Data
{
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
                                                   new CheeseModel("Gorgonzola", 22.59M, "test", "blue"),
                                                   new CheeseModel("Edam", 22.59M, "test", "red"),
                                                   new CheeseModel("Cheddar", 22.59M, "test", "yellow"),
                                                   new CheeseModel("Brie", 22.59M, "test", "white"),
                                                   new CheeseModel("Pecorino Romano", 22.59M, "test", "black")
                                               };

            return returnData;
        }
    }
}
