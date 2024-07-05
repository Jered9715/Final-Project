using System;
using System.Collections.Generic;

namespace ParkWishlistAndHistoryAPI.Models;

public partial class EndUser
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public virtual ICollection<ParkVisitHistory> ParkVisitHistories { get; set; } = new List<ParkVisitHistory>();

    public virtual ICollection<WishList> WishLists { get; set; } = new List<WishList>();
}
