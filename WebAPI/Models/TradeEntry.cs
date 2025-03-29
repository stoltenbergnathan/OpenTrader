using System;

namespace WebAPI.Models;

public class TradeEntry
{
    public int Id { get; set; }
    public string? Type { get; set; }
    public string? Symbol { get; set; }
    public List<Trade> Trades { get; set; } = new List<Trade>();
    public string? Notes { get; set; }
}
