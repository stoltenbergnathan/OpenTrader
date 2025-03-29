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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrade(int id)
        {
            var trade = await _tradeService.GetTradeByIdAsync(id);
            if (trade != null)
            {
                return Ok(trade);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddTrade(TradeEntry tradeEntry)
        {
            try
            {
                var createdTradeEntry = await _tradeService.AddTradeEntryAsync(tradeEntry);
                return Ok(createdTradeEntry);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrade(int id, TradeEntry tradeEntry)
        {
            try
            {
                var updatedTrade = await _tradeService.UpdateTradeEntryAsync(id, tradeEntry);
                if (updatedTrade != null)
                {
                    return Ok(updatedTrade);
                }
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrade(int id)
        {
            var deletedTrade = await _tradeService.DeleteTradeEntryAsync(id);
            if (deletedTrade != null)
            {
                return Ok(deletedTrade);
            }
            return NotFound();
        }
    }
}
