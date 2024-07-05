namespace ParkWishlistAndHistoryAPI.Models
{
    public class ParkVisitHistoryUpdateDto
    {
        public int? UserId { get; set; }

        public string? ParkCode { get; set; }

        public string? ParkNotes { get; set; }

        public string? DateVisited { get; set; }
    }
}
