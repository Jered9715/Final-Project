using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ParkWishlistAndHistoryAPI.Models;

public partial class ParkTrackerContext : DbContext
{
    public ParkTrackerContext()
    {
    }

    public ParkTrackerContext(DbContextOptions<ParkTrackerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EndUser> EndUsers { get; set; }

    public virtual DbSet<ParkVisitHistory> ParkVisitHistories { get; set; }

    public virtual DbSet<WishList> WishLists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EndUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__EndUser__1788CC4CE045AF25");

            entity.ToTable("EndUser");

            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
        });

        modelBuilder.Entity<ParkVisitHistory>(entity =>
        {
            entity.HasKey(e => e.ParkVisitId).HasName("PK__ParkVisi__122067FA6B081286");

            entity.ToTable("ParkVisitHistory");

            entity.Property(e => e.ParkVisitId).HasColumnName("ParkVisitID");
            entity.Property(e => e.DateVisited).HasMaxLength(15);

            entity.HasOne(d => d.User).WithMany(p => p.ParkVisitHistories)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__ParkVisit__UserI__398D8EEE");
        });

        modelBuilder.Entity<WishList>(entity =>
        {
            entity.HasKey(e => e.WishListId).HasName("PK__WishList__CAC4AA483233CB74");

            entity.ToTable("WishList");

            entity.Property(e => e.WishListId).HasColumnName("wishListId");

            entity.HasOne(d => d.User).WithMany(p => p.WishLists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__WishList__UserId__3C69FB99");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
