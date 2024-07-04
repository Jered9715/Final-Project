using Final_Project.Models;
using Microsoft.EntityFrameworkCore;


namespace Final_Project.DAL
{
    public class UserRepository
    {
        private readonly FinalProjectContext _context;
        public UserRepository(FinalProjectContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _context.Users
            .Select(u => new UserDto   
            {
                UserId = u.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName
            })
            .ToListAsync();

        }
        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }
            return new UserDto
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName  = user.LastName,
            };
        }
        public async Task<UserDto> AddUserAsync(UserDto userDto)
        {
            var user = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            userDto.UserId = user.UserId;
            return userDto;
        }

        public async Task<bool> UpdateUserAsync(UserDto userDto)
        {
            var user = await _context.Users.FindAsync(userDto.UserId);
            if (user == null)
            {
                return false;
            }
            user.FirstName = userDto.FirstName;
            user.LastName= userDto.LastName;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
