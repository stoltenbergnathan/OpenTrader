namespace WebAPI.Models;

public enum TradeType
{
    Stock = 0,
    Option = 1
}

public class TradeEntry
{
    public int Id { get; set; }
    public TradeType Type { get; set; }
    public string? Symbol { get; set; }
    public List<Trade> Trades { get; set; } = [];
    public string? Notes { get; set; }
    public List<Tag> Tags { get; set; } = [];
}
