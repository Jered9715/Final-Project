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


var app = builder.Build();
app.UseCors("AllowAllOrigins");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
