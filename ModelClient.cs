using System.Threading.Tasks;
using Azure;
using Azure.AI.OpenAI;
using OpenAI.Chat;

public interface IModelClient
{
    Task<string> Prompt(
        List<ChatMessage> messages,
        ChatCompletionOptions? options = null,
        CancellationToken cancellationToken = default);
}

public class TextModelClient : IModelClient
{
    private readonly ChatClient _client;
    private readonly ChatCompletionOptions _defaultOptions = new()
    {
        Temperature = 0.7f,
        MaxOutputTokenCount = 800,
        TopP = 0.95f,
        FrequencyPenalty = 0f,
        PresencePenalty = 0f
    };

    public TextModelClient(ModelSettings textModelSettings)
    {
        AzureOpenAIClient azureClient = new(
            new Uri(textModelSettings.Endpoint), new AzureKeyCredential(textModelSettings.ApiKey));
        _client = azureClient.GetChatClient(textModelSettings.DeploymentName);
    }

    public async Task<string> Prompt(List<ChatMessage> messages, ChatCompletionOptions? options = null, CancellationToken cancellationToken = default)
    {
        options ??= _defaultOptions;
        var response = await _client.CompleteChatAsync(messages, options, cancellationToken);
        return response.Value.Content[0].Text;
    }
}

public class ImageModelClient : IModelClient
{
    private readonly ChatClient _client;

    public ImageModelClient(ModelSettings imageModelSettings)
    {
        AzureOpenAIClient azureClient = new(
            new Uri(imageModelSettings.Endpoint), new AzureKeyCredential(imageModelSettings.ApiKey));
        _client = azureClient.GetChatClient(imageModelSettings.DeploymentName);
    }

    public Task<string> Prompt(List<ChatMessage> messages, ChatCompletionOptions? options = null, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}