using System;

namespace PZTest.Models
{
    using PZTest.Interfaces;

    public class CheeseModel : IGeneticDataItem
    {

        public Guid ID { get; }

        public string Name { get; set; }
        public decimal PricePerKG { get; set; }
        public string PictureUrl { get; set; }
        public string CheeseColour { get; set; }

        public CheeseModel() { }

        public CheeseModel(string _Name, decimal _Price, string _Url, string _Colour)
        {
            ID = Guid.NewGuid();
            Name = _Name;
            PricePerKG = _Price;
            PictureUrl = _Url;
            CheeseColour = _Colour;
        }
    }
}
