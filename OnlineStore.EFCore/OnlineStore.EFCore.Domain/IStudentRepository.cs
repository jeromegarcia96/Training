using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IStudentRepository
        : IRepository<Student>
    {
        PaginationResult<Student> RetrieveStudentWithPagination(int page, int itemsPerPage, string filter);
    }
}