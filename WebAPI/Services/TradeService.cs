using System;
using WebAPI.Data.Repositories;
using WebAPI.Models;

namespace WebAPI.Services;

public class TradeService : ITradeService
{
    private readonly ITradeRepository _tradeRepository;

    public TradeService(ITradeRepository tradeRepository)
    {
        _tradeRepository = tradeRepository;
    }

    public async Task<IEnumerable<TradeEntry>> GetAllTradesAsync()
    {
        return await _tradeRepository.GetAllAsync();
    }

    public async Task AddTradeEntryAsync(TradeEntry tradeEntry)
    {
        await _tradeRepository.AddAsync(tradeEntry);
    }
}
