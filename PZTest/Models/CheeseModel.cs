using System;

namespace PZTest.Models
{
    using PZTest.Interfaces;

    public class CheeseModel : CheeseModelNoID, IGeneticDataItem
    {

        public Guid ID { get; }

        public CheeseModel() { }

        public CheeseModel(string name, decimal price, string url, string colour)
        {
            this.ID = Guid.NewGuid();
            this.Name = name;
            this.PricePerKG = price;
            this.PictureUrl = url;
            this.CheeseColour = colour;
        }

        public CheeseModel(CheeseModelNoID cheese)
        {
            this.ID = Guid.NewGuid();
            this.Name = cheese.Name;
            this.PricePerKG = cheese.PricePerKG;
            this.PictureUrl = cheese.PictureUrl;
            this.CheeseColour = cheese.CheeseColour;
        }
    }
}
