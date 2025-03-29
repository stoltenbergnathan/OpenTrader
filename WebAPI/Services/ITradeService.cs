using WebAPI.Models;

namespace WebAPI.Services;

public interface ITradeService
{
    Task<IEnumerable<TradeEntry>> GetAllTradesAsync();
    Task<TradeEntry?> GetTradeByIdAsync(int id);
    Task<TradeEntry> AddTradeEntryAsync(TradeEntry tradeEntry);
    Task<TradeEntry?> UpdateTradeEntryAsync(int id, TradeEntry tradeEntry);
    Task<TradeEntry?> DeleteTradeEntryAsync(int id);
}
