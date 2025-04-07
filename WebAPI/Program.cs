using Microsoft.EntityFrameworkCore;
using WebAPI;
using WebAPI.Data.Repositories;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();
ConfigureMiddleware(app);

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // Add services to the container
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    services.AddControllers();

    // Configure CORS for locally running Angular development server
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAngularDev", policy =>
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod());
    });

    // Configure database context
    services.AddDbContext<OpenTraderDbContext>(options =>
    {
        options.UseSqlite("Data Source=opentrader.db");
    });

    // Register repositories and services
    services.AddScoped<ITradeRepository, TradeRepository>();
    services.AddScoped<ITradeService, TradeService>();
    services.AddScoped<ITagRepository, TagRepository>();
    services.AddScoped<ITagService, TagService>();
}

void ConfigureMiddleware(WebApplication app)
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<OpenTraderDbContext>();
        dbContext.Database.Migrate();
    }

    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseCors("AllowAngularDev");

    app.UseDefaultFiles();
    app.UseStaticFiles();

    // Map controllers and fallback
    app.MapControllers();
    app.MapFallbackToFile("index.html");
}