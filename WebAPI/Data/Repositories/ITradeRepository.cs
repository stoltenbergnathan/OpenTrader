using System;
using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public interface ITradeRepository
{
    Task<IEnumerable<TradeEntry>> GetAllAsync();
    Task AddAsync(TradeEntry tradeEntry);
}
