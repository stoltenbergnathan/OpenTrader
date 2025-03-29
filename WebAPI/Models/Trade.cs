using System;

namespace WebAPI.Models;

public class Trade
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string? Action { get; set; }
    public DateTime Date { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
}