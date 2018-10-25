using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class ManRepository : RepositoryBase<Man>, IManRepository
    {
        public ManRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Man> RetrieveManWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Man> result = new PaginationResult<Man>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Man>()
                    .OrderBy(x => x.LastName)
                    .Skip(page)
                    .Take(itemsPerPage)
                    .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Man>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Man>()
                  .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.LastName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Man>()
                        .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                        .Count();

                }
            }


            return result;
        }
    }
}
