using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public class TradeRepository : ITradeRepository
{
    private readonly OpenTraderDbContext _context;
    private readonly ITagRepository _tagRepository;

    public TradeRepository(OpenTraderDbContext context, ITagRepository tagRepository)
    {
        _context = context;
        _tagRepository = tagRepository;
    }

    public async Task<IEnumerable<TradeEntry>> GetAllAsync()
    {
        return await _context.TradeEntries
            .Include(te => te.Trades)
            .Include(te => te.Tags)
            .ToListAsync();
    }

    public async Task<TradeEntry?> GetByIdAsync(int id)
    {
        return await _context.TradeEntries
            .Where(te => te.Id == id)
            .Include(te => te.Trades)
            .Include(te => te.Tags)
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
        var existingTrade = await _context.TradeEntries
            .Include(te => te.Trades)
            .Include(te => te.Tags)
            .FirstOrDefaultAsync(te => te.Id == id);

        if (existingTrade == null)
        {
            return null;
        }

        _context.Entry(existingTrade).CurrentValues.SetValues(updatedTradeEntry);

        UpdateTradesinTradeEntry(updatedTradeEntry, existingTrade);
        await UpdateTagsinTradeEntry(updatedTradeEntry, existingTrade);

        await _context.SaveChangesAsync();

        return existingTrade;

        void UpdateTradesinTradeEntry(TradeEntry updatedTradeEntry, TradeEntry existingTrade)
        {
            foreach (var existingTradeItem in existingTrade.Trades.ToList())
            {
                if (!updatedTradeEntry.Trades.Any(t => t.Id == existingTradeItem.Id))
                {
                    _context.Trades.Remove(existingTradeItem);
                }
            }

            foreach (var updatedTradeItem in updatedTradeEntry.Trades)
            {
                var existingTradeItem = existingTrade.Trades.FirstOrDefault(t => t.Id == updatedTradeItem.Id);
                if (existingTradeItem != null)
                {
                    _context.Entry(existingTradeItem).CurrentValues.SetValues(updatedTradeItem);
                    _context.Entry(existingTradeItem).Property(t => t.TradeEntryId).IsModified = false;
                }
                else
                {
                    existingTrade.Trades.Add(updatedTradeItem);
                }
            }
        }

        async Task UpdateTagsinTradeEntry(TradeEntry updatedTradeEntry, TradeEntry existingTradeEntry)
        {
            foreach (var tag in existingTrade.Tags.ToList())
            {
                if (!updatedTradeEntry.Tags.Any(t => t.Name == tag.Name))
                {
                    existingTrade.Tags.Remove(tag);
                }
            }

            foreach (var tag in updatedTradeEntry.Tags)
            {
                if (!existingTradeEntry.Tags.Any(t => t.Name == tag.Name))
                {
                    var existingTag = await _tagRepository.GetByNameAsync(tag.Name);
                    if (existingTag == null)
                    {
                        existingTag = new Tag { Name = tag.Name };
                        await _tagRepository.AddAsync(existingTag);
                    }
                    existingTradeEntry.Tags.Add(existingTag);
                }
            }
        }
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
