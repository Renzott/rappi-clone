using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Backend.Models;

public class Client
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string? id { get; set; }
    public string? name { get; set; }
    public string? lastname { get; set; }
    public string? mail { get; set; }
    public string? imgPhoto { get; set; }
}