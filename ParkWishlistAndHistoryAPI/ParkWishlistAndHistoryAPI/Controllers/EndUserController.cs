using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkWishlistAndHistoryAPI.DAL;
using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EndUserController : ControllerBase
    {
        private readonly EndUserRepository _repo;

        public EndUserController(EndUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetEndUsers()
        {
            List<EndUser> endUsers = _repo.GetEndUsers();
            return Ok(endUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetEndUserById(int id)
        {
            EndUser endUser = _repo.GetEndUserById(id);
            if (endUser != null)
            {
                return Ok(endUser);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddEndUser([FromBody] EndUserCreationDto userDto)
        {
            _repo.AddEndUser(userDto);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEndUser(int id, [FromBody] EndUserUpdateDto userDto) 
        {
            EndUser endUser = _repo.GetEndUserById(id);
            if (endUser == null)
            {
                return NotFound();
            }
            endUser.FirstName = userDto.FirstName;
            endUser.LastName = userDto.LastName;
            _repo.UpdateEndUser(endUser);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEndUser(int id)
        {
            EndUser endUser = _repo.GetEndUserById(id);
            if (endUser == null) 
            {
                return NotFound();
            }
            _repo.DeleteEndUser(id);
            return NoContent();

        }

    }
}
