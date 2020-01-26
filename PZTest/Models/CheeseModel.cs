using System;

namespace PZTest.Models
{
    public class CheeseModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal PricePerKG { get; set; }
        public string PictureUrl { get; set; }
        public string CheeseColour { get; set; }

        public CheeseModel() { }

        public CheeseModel(string _Name, decimal _Price, string _Url, string _Colour)
        {
            Id = Guid.NewGuid();
            Name = _Name;
            PricePerKG = _Price;
            PictureUrl = _Url;
            CheeseColour = _Colour;
        }
    }
}
