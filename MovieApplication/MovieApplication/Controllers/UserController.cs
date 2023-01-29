using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApplication.Data;
using MovieApplication.Models;
using System.Security.Cryptography;
using System.Text;

namespace MovieApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MovieDbContext _movieDbContext;

        public UserController(MovieDbContext movieDbContext)
        {
            _movieDbContext = movieDbContext;
        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _movieDbContext.Users.ToListAsync();
        }



        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> Login(User objUser)
        {
            // Check if the user exists in the database
            var currentUser = await _movieDbContext.Users.SingleOrDefaultAsync(u => u.UserName == objUser.UserName);
            if (currentUser != null)
            {
                // Verify the user's password
                if (objUser.UserPassword == currentUser.UserPassword)
                {
                    if (currentUser.UserType == "Administrator")
                    {
                        return Ok(new { message = "Login successful as Administrator" });
                    }
                    else if (currentUser.UserType == "Normal User")
                    {
                        return Ok(new { message = "Login successful as Normal User" });
                    }
                    else
                    {
                        return Ok(new { message = "I dont know what are you" });
                    }
                }
                else
                {
                    return BadRequest(new { message = "Incorrect password" });
                }
            }
            else
            {
                return NotFound(new { message = "User not found" });
            }
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<User> AddUser(User objUser)
        {
            _movieDbContext.Users.Add(objUser);
            await _movieDbContext.SaveChangesAsync();
            return objUser;
        }


        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<User> UpdateUser(User objUser)
        {
            _movieDbContext.Users.Update(objUser);
            await _movieDbContext.SaveChangesAsync();
            return objUser;
        }



        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _movieDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _movieDbContext.Users.Remove(user);
            await _movieDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
