namespace TodoApi.Models
{
    public class TimeStoreDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TimesCollectionName { get; set; } = null!;
    }

}