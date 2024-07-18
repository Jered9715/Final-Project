using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.DAL
{
    public class ParkVisitHistoryRepository
    {
        private readonly ParkTrackerContext _context;

        public ParkVisitHistoryRepository(ParkTrackerContext context)
        {
            _context = context;
        }

        public List<ParkVisitHistory> GetAllParkVisitHistory()
        {
            return _context.ParkVisitHistories.ToList();
        }

        public ParkVisitHistory GetParkVisitById(int id)
        {
            return _context.ParkVisitHistories.FirstOrDefault(h => h.ParkVisitId == id);
        }

        public void AddParkVisitToHistory(ParkVisitHistoryCreationDto visitDto) 
        {
            ParkVisitHistory visitHistory = new ParkVisitHistory()
            {
                //userId hard coded to one as we are not currently allowing for change of user
                //can be easily modified to allow for different users
                UserId = 1,
                ParkCode = visitDto.ParkCode,
                ParkNotes = visitDto.ParkNotes,
                DateVisited = visitDto.DateVisited,
            };

            _context.ParkVisitHistories.Add(visitHistory);
            _context.SaveChanges();
        }

        public void UpdateParkVisit(ParkVisitHistory visit)
        {
            _context.ParkVisitHistories.Update(visit);
            _context.SaveChanges();
        }
        
        public void DeleteParkVisit(int id)
        {
            ParkVisitHistory parkVisit = _context.ParkVisitHistories.FirstOrDefault(h => h.ParkVisitId == id);
            if (parkVisit != null) 
            {
                _context.ParkVisitHistories.Remove(parkVisit);
                _context.SaveChanges();
            }


        }




    }
}
