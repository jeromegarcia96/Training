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
    public class CourseController : ControllerBase
    {
        private ICourseRepository courseRepo;

        public CourseController(ICourseRepository courseRepo)
        {
            this.courseRepo = courseRepo;
        }
        // GET: api/Course
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Course>))]
        public ActionResult<IEnumerable<Course>> Get()
        {

            return Ok(courseRepo.Retrieve().ToList());
        }

        // GET: api/Course/5
        [HttpGet("{id}", Name = "GetCourseByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Course))]
        public async Task<ActionResult<Course>> Get(Guid id)
        {
            try
            {
                var result = await courseRepo.RetrieveAsync(id);
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

        // GET: api/Course/5/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetCourseWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Course>))]
        public async Task<ActionResult<PaginationResult<Course>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Course>();
                result =  courseRepo.RetrieveCourseWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Course
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Course))]
        public async Task<ActionResult<Course>> Post([FromBody] Course course)
        {
            try
            {
                course.CourseID = Guid.NewGuid();
                await courseRepo.CreateAsync(course);
                return CreatedAtRoute("GetCourseByID",
                    new
                    {
                        id = course.CourseID
                    },
                    course);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Course/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Course))]
        public async Task<ActionResult<Course>> Put(Guid id, [FromBody] Course course)
        {
            try
            {
                var result = courseRepo.Retrieve().FirstOrDefault(x => x.CourseID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await courseRepo.UpdateAsync(id, course);

                return Ok(course);

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
                var result = courseRepo.Retrieve().FirstOrDefault(x => x.CourseID == id);
                if(result == null)
                {
                    return NotFound();
                }

                await courseRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
