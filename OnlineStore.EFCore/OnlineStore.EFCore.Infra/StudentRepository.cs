using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class StudentRepository : RepositoryBase<Student>, IStudentRepository
    {
        public StudentRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Student> RetrieveStudentWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Student> result = new PaginationResult<Student>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Student>()
                    .OrderBy(x => x.LastName)
                    .Skip(page)
                    .Take(itemsPerPage)
                    .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Student>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Student>()
                  .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.LastName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Student>()
                        .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                        .Count();

                }
            }


            return result;
        }
    }
}
