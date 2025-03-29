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
        return await _context.TradeEntries
            .Include(te => te.Trades)
            .ToListAsync();
    }

    public async Task<TradeEntry?> GetByIdAsync(int id)
    {
        return await _context.TradeEntries
            .Where(te => te.Id == id)
            .Include(te => te.Trades)
            .FirstOrDefaultAsync();
    }

    public async Task<TradeEntry> AddAsync(TradeEntry newTradeEntry)
    {
        var addedTradeEntry = await _context.TradeEntries.AddAsync(newTradeEntry);
        await _context.SaveChangesAsync();
        return addedTradeEntry.Entity;
    }

    public async Task<TradeEntry?> UpdateAsync(int id, TradeEntry updatedTradeEntry)
    {
        var existingTrade = await _context.TradeEntries.FirstOrDefaultAsync(te => te.Id == id);

        if (existingTrade == null)
        {
            return null;
        }

        _context.Entry(existingTrade).CurrentValues.SetValues(updatedTradeEntry);
        await _context.SaveChangesAsync();

        return existingTrade;
    }

    public async Task<TradeEntry?> DeleteAsync(int id)
    {
        var tradeToDelete = await _context.TradeEntries.FirstOrDefaultAsync(te => te.Id == id);

        if (tradeToDelete == null)
        {
            return null;
        }

        _context.TradeEntries.Remove(tradeToDelete);

        await _context.SaveChangesAsync();
        return tradeToDelete;
    }

}
