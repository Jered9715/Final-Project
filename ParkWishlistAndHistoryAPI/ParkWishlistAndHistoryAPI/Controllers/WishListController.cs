using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkWishlistAndHistoryAPI.DAL;
using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly WishListRepository _repo;

        public WishListController(WishListRepository repo) 
        {

            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetWishList()
        {
            List<WishList> wishLists = _repo.GetWishlist();
            return Ok(wishLists);
        }

        [HttpGet("{id}")]
        public IActionResult GetWishById(int id)
        {
            WishList wish = _repo.GetWishById(id);
            if (wish != null)
            {
                return Ok(wish);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddWish([FromBody] string parkCode)
        { 
            _repo.AddWish(parkCode);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWish(int id, [FromBody] WishListUpdateDto wishDto) 
        {
            WishList wish = _repo.GetWishById(id);
            if (wish == null) 
            {
                return NotFound();
            }
            wish.UserId = 1;
            wish.ParkCode = wishDto.ParkCode;
            _repo.UpdateWish(wish);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWish(int id)
        {
            WishList wish = _repo.GetWishById(id);
            if (wish == null) 
            {
                return NoContent();
            }
            _repo.DeleteWish(id);
            return NoContent();

        }

    }
}
