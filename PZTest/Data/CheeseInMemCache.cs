using System;
using System.Collections.Generic;
using System.Linq;

namespace PZTest.Data
{
    using PZTest.Interfaces;
    using PZTest.Models;
    using PZTest.Seed_Data;

    public class CheeseInMemCacheClass : IDataCache<CheeseModel>
    {
        Dictionary<Guid, CheeseModel> _CheeseCache = new Dictionary<Guid, CheeseModel>();
        public CheeseInMemCacheClass()
        {
            this._CheeseCache = SeedCheese.GetSeedCheese().ToDictionary(p => p.ID);
        }

        public CheeseModel[] Read()
        {
            return this._CheeseCache.Values.ToArray();
        }

        public CheeseModel Read(Guid id)
        {
            CheeseModel cheese;
            this._CheeseCache.TryGetValue(id, out cheese);
            return cheese;
        }

        public void Delete(Guid id)
        {
            this._CheeseCache.Remove(id);
        }

        public void Delete(CheeseModel tobeRemovedItem)
        {
            Delete(tobeRemovedItem.ID);
        }

        public void Update(CheeseModel newItem)
        {
            this._CheeseCache[newItem.ID] = newItem;
        }

        public void Create(CheeseModel newItem)
        {
            this._CheeseCache.Add(newItem.ID, newItem);
        }
    }
}
