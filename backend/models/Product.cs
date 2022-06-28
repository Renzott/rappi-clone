using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Backend.Models;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    public string? name { get; set; }
    public string? description { get; set; }
    public List<Category> categories { get; set; } = new List<Category>();
    public decimal price { get; set; }
    public List<string>? imageUrl { get; set; }
}