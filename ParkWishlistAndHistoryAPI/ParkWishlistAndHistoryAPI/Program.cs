using Microsoft.EntityFrameworkCore;
using ParkWishlistAndHistoryAPI.DAL;
using ParkWishlistAndHistoryAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ParkTrackerContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ParkTrackerContext>();
builder.Services.AddScoped<EndUserRepository>();
builder.Services.AddScoped<ParkVisitHistoryRepository>();
builder.Services.AddScoped<WishListRepository>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();