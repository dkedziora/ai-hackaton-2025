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

            HttpContent content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(_settings.Endpoint, content);

            string responseString = await response.Content.ReadAsStringAsync();
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
}