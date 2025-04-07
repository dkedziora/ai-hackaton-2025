using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Nodes;

public class SearchServiceClient
{
    private readonly ModelSettings _settings;

    public SearchServiceClient(ModelSettings settings)
    {
        _settings = settings;
    }

    public async Task<List<string>> SearchAsync(string query)
    {
        using (HttpClient client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("api-key", _settings.ApiKey);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var jsonPayload = @"
            {
              ""search"":" + query + @",
              ""queryType"":""semantic"",
              ""semanticConfiguration"":""azureml-default""
            }";

            string responseString = string.Empty;
            try
            {
                HttpContent content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(_settings.Endpoint, content);
                response.EnsureSuccessStatusCode();
                responseString = await response.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                responseString = FallbackStrategy();  
            }           
            
            var result = new List<string>();

            var jsonResponse = JsonNode.Parse(responseString);
            var jsonValuesArray = jsonResponse!["value"] as JsonArray;
            foreach (var jsonValue in jsonValuesArray!)
            {
                result.Add(jsonValue!["content"]!.ToString());
            }

            return result;
        }
    }

    private string FallbackStrategy()
    {
        return File.ReadAllText("search.json");
    }
}