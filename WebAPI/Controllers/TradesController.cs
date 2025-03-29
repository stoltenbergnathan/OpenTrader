using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradesController : ControllerBase
    {
        private readonly ITradeService _tradeService;

        public TradesController(ITradeService tradeService)
        {
            _tradeService = tradeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrades()
        {
            var trades = await _tradeService.GetAllTradesAsync();
            return Ok(trades);
        }

        [HttpPost]
        public async Task<IActionResult> AddTrade(TradeEntry tradeEntry)
        {
            await _tradeService.AddTradeEntryAsync(tradeEntry);
            return CreatedAtAction(nameof(GetTrades), new { id = tradeEntry.Id }, tradeEntry);
        }
    }
}
