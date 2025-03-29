using System;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<TradeEntry?> GetTradeByIdAsync(int id)
    {
        return await _tradeRepository.GetByIdAsync(id);
    }

    public async Task<TradeEntry> AddTradeEntryAsync(TradeEntry tradeEntry)
    {
        if (tradeEntry.Trades == null || tradeEntry.Trades.Count == 0)
        {
            throw new ArgumentException("A TradeEntry must have at least one associated trade.");
        }
        return await _tradeRepository.AddAsync(tradeEntry);
    }

    public async Task<TradeEntry?> UpdateTradeEntryAsync(int id, TradeEntry tradeEntry)
    {
        if (tradeEntry.Trades == null || tradeEntry.Trades.Count == 0)
        {
            throw new ArgumentException("A TradeEntry must have at least one associated trade.");
        }
        return await _tradeRepository.UpdateAsync(id, tradeEntry);
    }

    public async Task<TradeEntry?> DeleteTradeEntryAsync(int id)
    {
        return await _tradeRepository.DeleteAsync(id);
    }

}
