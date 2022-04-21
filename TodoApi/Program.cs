using TodoApi.Models;

var  MyAllowSpecificOrigins = "AllowAll";


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.Configure<TimeStoreDatabaseSettings>(
    builder.Configuration.GetSection("TimeStoreDatabase"));


builder.Services.AddCors(option => {
    option.AddPolicy(MyAllowSpecificOrigins, p => {
        p.WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

var summaries = new[]
{
    "Congelante", "Reforzante", "Frío", "Frío", "Suave", "Cálido", "Bálsamo", "Caliente", "Sofocante", "Abrazador"
};

app.MapGet("/", () =>
{
    var forecast =  Enumerable.Range(1, 100).Select(index =>
       {
        var temperature = Random.Shared.Next(-20, 55);
        var tempToZero = (temperature + 20) / 10;


        return new WeatherForecast(
            DateTime.Now.AddDays(index),
            temperature,
            summaries[tempToZero]
        );
       })
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}