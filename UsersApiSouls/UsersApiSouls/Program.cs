using Microsoft.EntityFrameworkCore;
using UsersApiSouls.Models;
using UsersApiSouls.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddDbContext<UserssoulsContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("userssouls"))); builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplicar CORS aquí antes de Authorization
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.MapUserEndpoints();

app.Run();
