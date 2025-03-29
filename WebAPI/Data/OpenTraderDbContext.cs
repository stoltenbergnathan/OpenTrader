using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI;

public class OpenTraderDbContext : DbContext
{
    public DbSet<TradeEntry> TradeEntries { get; set; }
    public DbSet<Trade> Trades { get; set; }

    public OpenTraderDbContext(DbContextOptions<OpenTraderDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TradeEntry>()
            .HasKey(te => te.Id);

        modelBuilder.Entity<TradeEntry>()
            .Property(te => te.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<TradeEntry>()
            .HasMany(te => te.Trades)
            .WithOne(t => t.TradeEntry)
            .HasForeignKey(t => t.TradeEntryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Trade>()
            .HasKey(t => t.Id);

        modelBuilder.Entity<Trade>()
            .Property(t => t.Id)
            .ValueGeneratedOnAdd();
    }
}
