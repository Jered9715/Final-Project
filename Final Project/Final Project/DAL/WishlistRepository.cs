using Microsoft.EntityFrameworkCore;
using Final_Project.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Final_Project.DAL
{
    public class WishlistRepository
    {
        private readonly FinalProjectContext _context;
        public WishlistRepository(FinalProjectContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<WishlistDto>>
        GetAllWishlistsAsync(int userId)
        {
            return await _context.Wishlists
            .Where(w => w.UserId == userId)
            .Select(w => new WishlistDto
            {
                WishlistId = w.WishListId,
                UserId = (int)w.UserId,
                ParkId = w.ParkId
            })
            .ToListAsync();

        }
        public async Task<WishlistDto> GetWishlistByIdAsync(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);
            if (wishlist == null)
            {

                return null;
            }
            return new WishlistDto
            {
                WishlistId = wishlist.WishListId,
                UserId = (int)wishlist.UserId,
                ParkId = wishlist.ParkId
            };
        }
        public async Task<WishlistDto> AddWishlistAsync(WishlistDto
        wishlistDto)
        {
            var wishlist = new Wishlist
            {
                UserId = wishlistDto.UserId,
                ParkId = wishlistDto.ParkId,
            };
            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            wishlistDto.ParkId = wishlist.ParkId;
            return wishlistDto;
        }
        public async Task<bool> DeleteWishlistAsync(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);
            if (wishlist == null)
            {
                return false;
            }
            _context.Wishlists.Remove(wishlist); 
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
