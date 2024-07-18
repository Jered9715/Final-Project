using System;
using System.Collections.Generic;

namespace ParkWishlistAndHistoryAPI.Models;

public partial class ParkVisitHistory
{
    public int ParkVisitId { get; set; }

    public int? UserId { get; set; }

    public string? ParkCode { get; set; }

    public string? ParkNotes { get; set; }

    public string? DateVisited { get; set; }

    public virtual EndUser? User { get; set; }
}
