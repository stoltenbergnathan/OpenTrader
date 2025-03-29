using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public class TradeRepository : ITradeRepository
{
    private readonly OpenTraderDbContext _context;

    public TradeRepository(OpenTraderDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TradeEntry>> GetAllAsync()
    {
        return await _context.TradeEntries.ToListAsync();
    }

    public async Task AddAsync(TradeEntry tradeEntry)
    {
        await _context.TradeEntries.AddAsync(tradeEntry);
        await _context.SaveChangesAsync();
    }
}
