using Microsoft.EntityFrameworkCore;
using WebAPI;

var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        policy => policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddDbContext<OpenTraderDbContext>(options =>
{
    options.UseSqlite("Data Source=opentrader.db");
});

var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseCors("AllowAngularDev");

app.MapGet("/api/test", () => "Hello World!");

app.MapGet("/api/trades", () =>
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<OpenTraderDbContext>();
    var trades = dbContext.TradeEntries.Include(te => te.Trades).ToList();
    return trades;
});

app.MapPost("/api/trade", (TradeEntry tradeEntry) =>
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<OpenTraderDbContext>();

    // Ensure the ID is reset to 0 so the database can assign a new ID
    tradeEntry.Id = 0;

    // Add the new trade entry to the database
    dbContext.TradeEntries.Add(tradeEntry);
    dbContext.SaveChanges();

    return Results.Ok(tradeEntry);
});

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
app.Run();
public class TradeEntry
{
    public int Id { get; set; }
    public string? Type { get; set; }
    public string? Symbol { get; set; }
    public List<Trade> Trades { get; set; } = new List<Trade>();
    public string? Notes { get; set; }
}

public class Trade
{
    public int Id { get; set; }
    public string? Action { get; set; }
    public DateTime Date { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
}


