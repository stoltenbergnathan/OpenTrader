using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public interface ITradeRepository
{
    Task<IEnumerable<TradeEntry>> GetAllAsync();
    Task<TradeEntry?> GetByIdAsync(int id);
    Task<TradeEntry> AddAsync(TradeEntry newTradeEntry);
    Task<TradeEntry?> UpdateAsync(int id, TradeEntry updatedTradeEntry);
    Task<TradeEntry?> DeleteAsync(int id);
}
