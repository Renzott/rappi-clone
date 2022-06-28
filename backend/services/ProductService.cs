using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text.RegularExpressions;
using Backend.Services;

namespace Backend.Services;


public class ProductService
{
    private readonly IMongoCollection<Product> _productCollection;

    public ProductService(IOptions<DatabaseSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _productCollection = database.GetCollection<Product>("products");
    }

    public async Task<List<Product>> GetAll() =>
       await _productCollection.Find(prod => true).ToListAsync();

    public async Task<Product> Get(string id) =>
        await _productCollection.Find(prod => prod.id == id).FirstOrDefaultAsync();

    public async Task<List<Product>> Search(string name)
    {
        var pattern = "^" + name + ".*";
        var regex = new Regex(pattern, RegexOptions.IgnoreCase);
        var filter = Builders<Product>.Filter.Regex("name", regex);

        return await _productCollection.Find(filter).ToListAsync();
    }

    public async Task<List<Product>> Search(string category, string name)
    {
        var pattern = "^" + name + ".*";
        var regex = new Regex(pattern, RegexOptions.IgnoreCase);

        var filter = Builders<Product>.Filter.Regex("name", regex)
            & Builders<Product>.Filter.Eq("categories.id", category);

        return await _productCollection.Find(filter).ToListAsync();
    }

    public async Task Create(Product prod){
        await _productCollection.InsertOneAsync(prod);
    }

    public async Task Update(string id, Product prod) =>
        await _productCollection.ReplaceOneAsync(prod => prod.id == id, prod);

    public async Task Remove(Product prod) =>
        await _productCollection.DeleteOneAsync(prod => prod.id == prod.id);

    public async Task<List<Product>> GetByCategory(string id) =>
        await _productCollection.Find(prod => prod.categories.Any(cat => cat.id == id)).ToListAsync();

}