using System;
using System.Collections.Generic;

namespace Final_Project.Models;

public partial class ParkVisitHistory
{
    public int ParkVisitId { get; set; }

    public int? UserId { get; set; }

    public string? ParkNotes { get; set; }

    public string? DateVisited { get; set; }

    public virtual User? User { get; set; }
}
