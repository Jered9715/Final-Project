using Final_Project.DAL;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Final_Project.Models;


namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController :ControllerBase
    {
            private readonly UserRepository _userRepository;
            public UserController(UserRepository userRepository)
            {
                _userRepository = userRepository;
            }
            [HttpGet]
            public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
            {
                var users = await _userRepository.GetAllUsersAsync();
                return Ok(users);
            }
            [HttpGet("{id}")]
            public async Task<ActionResult<UserDto>> GetUser(int id)
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            [HttpPost]
            public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
            {
                var createdUser = await _userRepository.AddUserAsync(userDto);

                return CreatedAtAction(nameof(GetUser), new
                {
                    id = createdUser.UserId
                }, createdUser);
            }
            [HttpPut("{id}")]
            public async Task<IActionResult> PutUser(int id, UserDto userDto)
            {
                if (id != userDto.UserId)
                {
                    return BadRequest();
                }
                var updated = await _userRepository.UpdateUserAsync(userDto);
                if (!updated)
                {
                    return NotFound();
                }
                return NoContent();
            }
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteUser(int id)
            {
                var deleted = await _userRepository.DeleteUserAsync(id);
                if (!deleted)
                {
                    return NotFound();
                }
                return NoContent();
            }
    }
}
