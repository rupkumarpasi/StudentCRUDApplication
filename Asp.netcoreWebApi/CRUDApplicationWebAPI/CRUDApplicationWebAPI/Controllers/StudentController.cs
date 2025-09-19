using CRUDApplicationWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace CRUDApplicationWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentdbContext context;

        public StudentController(StudentdbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> Get()
        {
            var data = await context.Students.ToListAsync();
            return Ok(data);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetById(int? id)
        {
            var student = await context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPost]
        public async Task<ActionResult> CreateStudent(Student student)
        {
            if (student == null)
            {
                return BadRequest();
            }
          await context.Students.AddAsync(student);
            await context.SaveChangesAsync();
            return Ok(student);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> Edit(int? id, Student student)
        {
           
            if (id != student.Id)
                return BadRequest();
            context.Entry(student).State = EntityState.Modified;
            await context.SaveChangesAsync();   
            return Ok(student);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(int? id)
        {
            var std = await context.Students.FindAsync(id);
            if (std == null)
                NotFound();
           context.Students.Remove(std);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
