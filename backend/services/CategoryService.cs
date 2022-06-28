using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text.RegularExpressions;


namespace Backend.Services;

public class CategoryService
{
    private readonly IMongoCollection<Category> _categoryCollection;

    public CategoryService(IOptions<DatabaseSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _categoryCollection = database.GetCollection<Category>("categories");
    }

    public async Task<List<Category>> GetAll() =>
        await _categoryCollection.Find(cat => true).ToListAsync();

    public async Task<Category> Get(string id) =>
        await _categoryCollection.Find(cat => cat.id == id).FirstOrDefaultAsync();

    // verify if category exists
    public async Task Create(Category cat)
    {
        var exists = await _categoryCollection.Find(item => item.id == cat.id).FirstOrDefaultAsync();
        
        if (exists == null)
        {
            await _categoryCollection.InsertOneAsync(cat);
        }
    }


    public async Task Update(string id, Category cat) =>
        await _categoryCollection.ReplaceOneAsync(cat => cat.id == id, cat);
}