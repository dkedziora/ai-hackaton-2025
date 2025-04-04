using OpenAI.Chat;
using Azure.AI.OpenAI;
using Azure;

public class AiModel {
    private readonly ChatClient _client;

    public AiModel(string endpoint, ModelSettings modelSettings)
    {
        AzureOpenAIClient azureClient = new(new Uri(endpoint), new AzureKeyCredential(modelSettings.ApiKey));
        _client = azureClient.GetChatClient(modelSettings.DeploymentName);
    }

    public string Prompt(
        List<ChatMessage> messages, 
        ChatCompletionOptions? options = null, 
        CancellationToken cancellationToken = default)
    {
        var response = _client.CompleteChat(messages, options, cancellationToken);
        return response.Value.Content[0].Text;
    }
}