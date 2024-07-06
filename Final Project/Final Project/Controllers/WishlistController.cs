using Microsoft.AspNetCore.Mvc;
using Final_Project.DAL;
using Final_Project.Models;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly WishlistRepository _wishlistRepository;
        public WishlistController(WishlistRepository wishlistRepository)
        {
            _wishlistRepository = wishlistRepository;
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<WishlistDto>>>

        GetWishlists(int userId)

        {
            var wishlists = await

            _wishlistRepository.GetAllWishlistsAsync(userId);

            return Ok(wishlists);
        }
        [HttpPost]
        public async Task<ActionResult<WishlistDto>>

        PostWishlist(WishlistDto wishlistDto)

        {
            var createdWishlist = await

            _wishlistRepository.AddWishlistAsync(wishlistDto);

            return CreatedAtAction(nameof(GetWishlists), new
            {
                userId = createdWishlist.UserId
            }, createdWishlist);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlist(int id)

        {
            var deleted = await

            _wishlistRepository.DeleteWishlistAsync(id);

            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}