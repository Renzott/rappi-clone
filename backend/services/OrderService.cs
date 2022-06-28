using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text.RegularExpressions;


namespace Backend.Services;

public class OrderService
{
    private readonly IMongoCollection<Order> _orderCollection;

    public OrderService(IOptions<DatabaseSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _orderCollection = database.GetCollection<Order>("orders");
    }

    public async Task<List<Order>> GetAll() =>
         await _orderCollection.Find(order => true).ToListAsync();

    public async Task<Order> Get(string id) =>
        await _orderCollection.Find(order => order.id == id).FirstOrDefaultAsync();

    public async Task<List<Order>> Search(string name)
    {
        var regex = new Regex(name, RegexOptions.IgnoreCase);
        var filter = Builders<Order>.Filter.Regex("name", regex);

        return await _orderCollection.Find(filter).ToListAsync();
    }

    public async Task Create(Order order) =>
        await _orderCollection.InsertOneAsync(order);

    public async Task Update(string id, Order order) =>
        await _orderCollection.ReplaceOneAsync(order => order.id == id, order);

    public async Task Remove(Order order) =>
        await _orderCollection.DeleteOneAsync(order => order.id == order.id);

    public async Task<UpdateResult> UpdateStatus(string id, string status) =>
        await _orderCollection.UpdateOneAsync(order => order.id == id, Builders<Order>.Update.Set("status", status));
}
