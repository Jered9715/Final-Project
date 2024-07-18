using System;
using System.Collections.Generic;

namespace ParkWishlistAndHistoryAPI.Models;

public partial class WishList
{
    public int WishListId { get; set; }

    public int? UserId { get; set; }

    public string? ParkCode { get; set; }

    public virtual EndUser? User { get; set; }
}
