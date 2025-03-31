using System;
using System.Text.Json.Serialization;

namespace WebAPI.Models;

public class Trade
{
    public int Id { get; set; }
    public string? Action { get; set; }
    public DateTimeOffset Date { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }

    public int TradeEntryId { get; set; }
    [JsonIgnore]
    public TradeEntry? TradeEntry { get; set; }
}