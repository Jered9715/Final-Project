using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.Models;

public partial class FinalProjectContext : DbContext
{
    public FinalProjectContext()
    {
    }

    public FinalProjectContext(DbContextOptions<FinalProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ParkVisitHistory> ParkVisitHistories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ParkVisitHistory>(entity =>
        {
            entity.HasKey(e => e.ParkVisitId).HasName("PK__ParkVisi__122067DA9424929B");

            entity.ToTable("ParkVisitHistory");

            entity.Property(e => e.DateVisited).HasMaxLength(100);

            entity.HasOne(d => d.User).WithMany(p => p.ParkVisitHistories)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__ParkVisit__UserI__412EB0B6");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C29582851");

            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.WishListId).HasName("PK__Wishlist__E41F8787EC30A603");

            entity.ToTable("Wishlist");

            entity.HasOne(d => d.User).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Wishlist__ParkId__440B1D61");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
