using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class NoteRepository : RepositoryBase<Note>, INoteRepository
    {
        public NoteRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Note> RetrieveNoteWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Note> result = new PaginationResult<Note>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Note>()
                    .OrderBy(x => x.Description)
                    .Skip(page)
                    .Take(itemsPerPage)
                    .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Note>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Note>()
                  .Where(x => x.Description.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.Description)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Note>()
                        .Where(x => x.Description.ToLower().Contains(filter.ToLower()))
                        .Count();

                }
            }


            return result;
        }
    }
}
