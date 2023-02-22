using Microsoft.EntityFrameworkCore;
using PAS.Data;
using DbContext = PAS.Data.DbContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<Seeder>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(cors => { cors.AllowAnyMethod().AllowAnyOrigin(); });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DbContext>();
    dataContext.Database.Migrate();
}

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
