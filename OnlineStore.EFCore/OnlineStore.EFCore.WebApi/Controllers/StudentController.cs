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
    public class StudentController : ControllerBase
    {
        private IStudentRepository studentRepo;

        public StudentController(IStudentRepository studentRepo)
        {
            this.studentRepo = studentRepo;
        }
        // GET: api/Student
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Student>))]
        public ActionResult<IEnumerable<Student>> Get()
        {

            return Ok(studentRepo.Retrieve().ToList());
        }

        // GET: api/Student/5
        [HttpGet("{id}", Name = "GetStudentByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Student))]
        public async Task<ActionResult<Student>> Get(Guid id)
        {
            try
            {
                var result = await studentRepo.RetrieveAsync(id);
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

        // GET: api/Student/5/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetStudentWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Student>))]
        public async Task<ActionResult<PaginationResult<Student>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Student>();
                result =  studentRepo.RetrieveStudentWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Student
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Student))]
        public async Task<ActionResult<Student>> Post([FromBody] Student student)
        {
            try
            {
                student.StudentID = Guid.NewGuid();
                await studentRepo.CreateAsync(student);
                return CreatedAtRoute("GetStudentByID",
                    new
                    {
                        id = student.StudentID
                    },
                    student);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Student/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Student))]
        public async Task<ActionResult<Student>> Put(Guid id, [FromBody] Student student)
        {
            try
            {
                var result = studentRepo.Retrieve().FirstOrDefault(x => x.StudentID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await studentRepo.UpdateAsync(id, student);

                return Ok(student);

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
                var result = studentRepo.Retrieve().FirstOrDefault(x => x.StudentID == id);
                if(result == null)
                {
                    return NotFound();
                }

                await studentRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
