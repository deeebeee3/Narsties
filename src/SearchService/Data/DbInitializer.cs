using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings
    .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();

        var count = await DB.CountAsync<Item>();

        //GET DATA FROM A FILE
        /*         
        if (count == 0)
        {
            Console.WriteLine("No data - will attempt to seed");

            var itemData = await File.ReadAllTextAsync("Data/auctions.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            //deserialize the json formatted file data into a list of Items in dotnet format
            var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);

            await DB.SaveAsync(items);
        } 
        */

        //GET DATA USING HTTP
        using var scope = app.Services.CreateScope();

        // We need access to our AuctionSvcHttpClient service when we run our DbInitializer. However, we are not 
        // able to inject it into this class since we need access to the service before the application 
        // is up and running (await DbInitializer.InitDb(app); is called before app.Run(); in Program.cs), 
        // so we need to use this approach and create a scope to get access to the service
        // Once we are finished with the InitDb method, the scope will be cleaned up / disposed.
        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

        var items = await httpClient.GetItemsForSearchDb();

        Console.WriteLine(items.Count + " returned from the aution service");

        if (items.Count > 0)
        {
            await DB.SaveAsync(items);
        }
    }
}
