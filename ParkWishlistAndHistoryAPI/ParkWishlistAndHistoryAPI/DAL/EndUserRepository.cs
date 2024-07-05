using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.DAL
{
    public class EndUserRepository
    {
        private readonly ParkTrackerContext _context;

        public EndUserRepository(ParkTrackerContext context)
        {
            _context = context;
        }

        public List<EndUser> GetEndUsers()
        {
            return _context.EndUsers.ToList();
        }

        public EndUser GetEndUserById(int id) 
        {
            return _context.EndUsers.FirstOrDefault(u => u.UserId == id);
        }

        public void AddEndUser(EndUserCreationDto endUserDto) 
        {
            EndUser endUser = new EndUser()
            {
                FirstName = endUserDto.FirstName,
                LastName = endUserDto.LastName,
            };
        }

        public void UpdateEndUser(EndUser endUser)
        {
            _context.EndUsers.Add(endUser);
            _context.SaveChanges();
        }

        public void DeleteEndUser(int id)
        {
            EndUser endUser = _context.EndUsers.FirstOrDefault(u => u.UserId==id);
            if (endUser != null)
            {
                _context.EndUsers.Remove(endUser);
                _context.SaveChanges();
            }
        }

    }
}
