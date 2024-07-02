using System;
using System.Collections.Generic;

namespace Final_Project.Models;

public partial class Wishlist
{
    public int WishListId { get; set; }

    public int? UserId { get; set; }

    public string? ParkId { get; set; }

    public virtual User? User { get; set; }
}
