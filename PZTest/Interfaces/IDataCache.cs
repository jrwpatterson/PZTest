using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PZTest.Models;

namespace PZTest.Interfaces
{

    public interface IDataCache<T> where T : IGeneticDataItem
    {
        CheeseModel[] Read();

        CheeseModel? Read(Guid id);

        void Delete(Guid id);

        void Delete(T deletedItem);

        void Update(T newItem);

        void Create(T newItem);
    }
}
