using System;

namespace WebAPI.Models;

public class TradeEntry
{
    public int Id { get; set; }
    public string? Type { get; set; }
    public string? Symbol { get; set; }
    public List<Trade> Trades { get; set; } = [];
    public string? Notes { get; set; }
    public List<Tag> Tags { get; set; } = [];
}
