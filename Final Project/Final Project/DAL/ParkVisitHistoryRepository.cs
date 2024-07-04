using Final_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.DAL
{
    public class ParkVisitHistoryRepository
    {
        private readonly FinalProjectContext _context;
        public ParkVisitHistoryRepository(FinalProjectContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ParkVisitHistoryDto>> GetAllParkVisitHistoriesAsync()
        {
            return await _context.ParkVisitHistories
            .Select(p => new ParkVisitHistoryDto
            {
                ParkVisitId = p.ParkVisitId,
                UserId = (int)p.UserId,
                ParkNotes = p.ParkNotes,
                DateVisited = p.DateVisited
            })
            .ToListAsync();

        }
        public async Task<ParkVisitHistoryDto> GetParkVisitHistoryByIdAsync(int id)
        {
            var visit = await _context.ParkVisitHistories.FindAsync(id);
            if (visit == null)
            {
                return null;
            }
            return new ParkVisitHistoryDto
            {
                ParkVisitId = visit.ParkVisitId,
                UserId = (int)visit.UserId,
                ParkNotes = visit.ParkNotes,
                DateVisited = visit.DateVisited
            };
        }
        public async Task<ParkVisitHistoryDto> AddParkVisitHistoryAsync(ParkVisitHistoryDto parkVisitHistoryDto)
        {
            var visit = new ParkVisitHistory
            {
                UserId = parkVisitHistoryDto.UserId,
                ParkNotes = parkVisitHistoryDto.ParkNotes,
                DateVisited = parkVisitHistoryDto.DateVisited
            };
            _context.ParkVisitHistories.Add(visit);
            await _context.SaveChangesAsync();
            parkVisitHistoryDto.UserId = (int)visit.UserId;
            return parkVisitHistoryDto;
        }

        public async Task<bool> UpdateParkVisitHistoryAsync(ParkVisitHistoryDto parkVisitHistoryDto)
        {
            var visit = await _context.ParkVisitHistories.FindAsync(parkVisitHistoryDto.ParkVisitId);
            if (visit == null)
            {
                return false;
            }
            visit.ParkNotes = parkVisitHistoryDto.ParkNotes;
            visit.UserId = parkVisitHistoryDto.UserId;
            visit.DateVisited = parkVisitHistoryDto.DateVisited;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteParkVisitHistoryAsync(int id)
        {
            var visit = await _context.ParkVisitHistories.FindAsync(id);
            if (visit == null)
            {
                return false;
            }
            _context.ParkVisitHistories.Remove(visit);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}