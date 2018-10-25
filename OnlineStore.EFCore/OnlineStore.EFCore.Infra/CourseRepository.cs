using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class CourseRepository : RepositoryBase<Course>, ICourseRepository
    {
        public CourseRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Course> RetrieveCourseWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Course> result = new PaginationResult<Course>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Course>()
                    .OrderBy(x => x.CourseName)
                    .Skip(page)
                    .Take(itemsPerPage)
                    .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Course>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Course>()
                  .Where(x => x.CourseName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.CourseName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Course>()
                        .Where(x => x.CourseName.ToLower().Contains(filter.ToLower()))
                        .Count();

                }
            }


            return result;
        }
    }
}
