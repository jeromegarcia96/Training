using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface INoteRepository
        : IRepository<Note>
    {
        PaginationResult<Note> RetrieveNoteWithPagination(int page, int itemsPerPage, string filter);
    }
}