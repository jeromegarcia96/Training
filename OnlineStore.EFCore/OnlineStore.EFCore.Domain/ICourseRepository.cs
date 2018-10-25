using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface ICourseRepository
        : IRepository<Course>
    {
        PaginationResult<Course> RetrieveCourseWithPagination(int page, int itemsPerPage, string filter);
    }
}