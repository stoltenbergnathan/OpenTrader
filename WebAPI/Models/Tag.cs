using System.Text.Json.Serialization;

namespace WebAPI.Models;

public class Tag
{
    public int Id { get; set; }
    public string? Name { get; set; }
    [JsonIgnore]
    public List<TradeEntry> TradeEntries { get; set; } = [];
}
