using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Index(nameof(Name), IsUnique = true)]
public class Tag
{
    public int Id { get; set; }
    public string? Name { get; set; }
    [JsonIgnore]
    public List<TradeEntry> TradeEntries { get; set; } = [];
}
