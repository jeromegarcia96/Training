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
    public class ManController : ControllerBase
    {
        private IManRepository manRepo;

        public ManController(IManRepository manRepo)
        {
            this.manRepo = manRepo;
        }
        // GET: api/Man
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Man>))]
        public ActionResult<IEnumerable<Man>> Get()
        {

            return Ok(manRepo.Retrieve().ToList());
        }

        // GET: api/Man/5
        [HttpGet("{id}", Name = "GetManByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Man))]
        public async Task<ActionResult<Man>> Get(Guid id)
        {
            try
            {
                var result = await manRepo.RetrieveAsync(id);
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

        // GET: api/Man/5/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetManWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Man>))]
        public async Task<ActionResult<PaginationResult<Man>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Man>();
                result =  manRepo.RetrieveManWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Man
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Man))]
        public async Task<ActionResult<Man>> Post([FromBody] Man man)
        {
            try
            {
                man.ManId = Guid.NewGuid();
                await manRepo.CreateAsync(man);
                return CreatedAtRoute("GetManByID",
                    new
                    {
                        id = man.ManId
                    },
                    man);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Man/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Man))]
        public async Task<ActionResult<Man>> Put(Guid id, [FromBody] Man man)
        {
            try
            {
                var result = manRepo.Retrieve().FirstOrDefault(x => x.ManId == id);
                if (result == null)
                {
                    return NotFound();
                }
                await manRepo.UpdateAsync(id, man);

                return Ok(man);

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
                var result = manRepo.Retrieve().FirstOrDefault(x => x.ManId == id);
                if(result == null)
                {
                    return NotFound();
                }

                await manRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
