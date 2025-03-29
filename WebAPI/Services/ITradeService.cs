using WebAPI.Models;

namespace WebAPI.Services;

public interface ITradeService
{
    Task<IEnumerable<TradeEntry>> GetAllTradesAsync();
    Task AddTradeEntryAsync(TradeEntry tradeEntry);
}
