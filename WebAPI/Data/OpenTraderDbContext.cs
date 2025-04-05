using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI;

public class OpenTraderDbContext : DbContext
{
    public DbSet<TradeEntry> TradeEntries { get; set; }
    public DbSet<Trade> Trades { get; set; }
    public DbSet<Tag> Tags { get; set; }

    public OpenTraderDbContext(DbContextOptions<OpenTraderDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}
