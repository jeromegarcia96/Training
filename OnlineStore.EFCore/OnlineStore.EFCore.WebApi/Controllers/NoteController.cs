using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private INoteRepository noteRepo;

        public NoteController(INoteRepository noteRepo)
        {
            this.noteRepo = noteRepo;
        }
        // GET: api/Note
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Note>))]
        public ActionResult<IEnumerable<Note>> Get()
        {

            return Ok(noteRepo.Retrieve().ToList());
        }

        // GET: api/Note/5
        [HttpGet("{id}", Name = "GetNoteByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Note))]
        public async Task<ActionResult<Note>> Get(Guid id)
        {
            try
            {
                var result = await noteRepo.RetrieveAsync(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Note/5/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetNoteWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Note>))]
        public async Task<ActionResult<PaginationResult<Note>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Note>();
                result = noteRepo.RetrieveNoteWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Note
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Note))]
        public async Task<ActionResult<Note>> Post([FromBody] Note note)
        {
            try
            {
                note.NoteId = Guid.NewGuid();
                await noteRepo.CreateAsync(note);
                return CreatedAtRoute("GetNoteByID",
                    new
                    {
                        id = note.NoteId
                    },
                    note);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Note/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Note))]
        public async Task<ActionResult<Note>> Put(Guid id, [FromBody] Note note)
        {
            try
            {
                var result = noteRepo.Retrieve().FirstOrDefault(x => x.NoteId == id);
                if (result == null)
                {
                    return NotFound();
                }
                await noteRepo.UpdateAsync(id, note);

                return Ok(note);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = noteRepo.Retrieve().FirstOrDefault(x => x.NoteId == id);
                if (result == null)
                {
                    return NotFound();
                }

                await noteRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
