using System;
using System.Collections.Generic;

namespace Final_Project.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public virtual ICollection<ParkVisitHistory> ParkVisitHistories { get; set; } = new List<ParkVisitHistory>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
