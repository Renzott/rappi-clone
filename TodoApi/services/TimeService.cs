using TodoApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TodoApi.Services;


public class TimeService
{
    private readonly IMongoCollection<Time> _timesCollection;

    public TimeService(IOptions<TimeStoreDatabaseSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _timesCollection = database.GetCollection<Time>(settings.Value.TimesCollectionName);
    }

    public async Task<List<Time>> GetTimes() =>
       await _timesCollection.Find(time => true).ToListAsync();

    public async Task<Time?> GetTime(string id) =>
        await _timesCollection.Find(time => time.Id == id).FirstOrDefaultAsync();

    public async Task Create(Time time) =>
        await _timesCollection.InsertOneAsync(time);

    public async Task Update(string id, Time time) =>
        await _timesCollection.ReplaceOneAsync(time => time.Id == id, time);

    public async Task Remove(Time time) =>
        await _timesCollection.DeleteOneAsync(time => time.Id == time.Id);

}
