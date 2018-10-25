using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IManRepository
        : IRepository<Man>
    {
        PaginationResult<Man> RetrieveManWithPagination(int page, int itemsPerPage, string filter);
    }
}