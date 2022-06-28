using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Backend.Models;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    public List<Product> listProduct { get; set; } = new List<Product>();
    public Client client { get; set; } = new Client();
    public string status { get; set; } = "Pending";
    public double? totalPrice { get; set; }
    public string? date { get; set; }
    public string? finishedDate { get; set; }
}