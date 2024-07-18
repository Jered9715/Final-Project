using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.DAL
{
    public class WishListRepository
    {
        public readonly ParkTrackerContext _context;

        public WishListRepository(ParkTrackerContext context)
        {
            _context = context;
        }

        public List<WishList> GetWishlist()
        { 
            return _context.WishLists.ToList();
        }

        public WishList GetWishById(int id)
        {
            return _context.WishLists.FirstOrDefault(w => w.WishListId == id);
        }

        public void AddWish(WishListCreationDto wishListCreationDto) 
        {
            WishList wish = new WishList()
            {
                //userId hard coded to one as we are not currently allowing for change of user
                //can be easily modified to allow for different users
                UserId = 1,
                ParkCode = wishListCreationDto.ParkCode,
            };
            _context.WishLists.Add(wish);
            _context.SaveChanges();
        }

        public void UpdateWish(WishList wish)
        {
            _context.WishLists.Update(wish);
            _context.SaveChanges();
        }

        public void DeleteWish(int id) 
        {
            WishList wish = _context.WishLists.FirstOrDefault(w => w.WishListId == id);
            if (wish != null) 
            {
                _context.WishLists.Remove(wish);
                _context.SaveChanges();
            }
        }


    }
}
