using Azure;
using Azure.AI.OpenAI;
using OpenAI.Chat;
using OpenAI.Images;

public class TextModelClient
{
    private readonly ChatClient _client;
    private readonly ChatCompletionOptions _defaultOptions = new()
    {
        Temperature = 0.7f,
        MaxOutputTokenCount = 800,
        TopP = 0.95f,
        FrequencyPenalty = 0f,
        PresencePenalty = 0f,
    };

    public TextModelClient(ModelSettings textModelSettings)
    {
        // Potentially, you can set the retry policy here if needed.
        // AzureOpenAIClientOptions options = new()
        // {
        //     RetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(30), 3),
        // };
        AzureOpenAIClient azureClient = new(
            new Uri(textModelSettings.Endpoint), new AzureKeyCredential(textModelSettings.ApiKey));
        _client = azureClient.GetChatClient(textModelSettings.DeploymentName);
    }

    public async Task<string> TextPrompt(List<ChatMessage> messages, ChatCompletionOptions? options = null, CancellationToken cancellationToken = default)
    {
        options ??= _defaultOptions;
        var response = await _client.CompleteChatAsync(messages, options, cancellationToken);
        return response.Value.Content[0].Text;
    }
}

public class ImageModelClient
{
    private readonly ImageClient _client;

    public ImageModelClient(ModelSettings imageModelSettings)
    {
        AzureOpenAIClient openAiClient = new(
            new Uri(imageModelSettings.Endpoint), new AzureKeyCredential(imageModelSettings.ApiKey));
        _client = openAiClient.GetImageClient(imageModelSettings.DeploymentName);
    }

    public async Task<string> ImagePrompt(string prompt, ChatCompletionOptions? options = null, CancellationToken cancellationToken = default)
    {
        GeneratedImage generatedImage = 
            await _client.GenerateImageAsync(prompt, new ImageGenerationOptions { 
                Size = GeneratedImageSize.W1024xH1024 }, cancellationToken);

        return generatedImage.ImageUri.ToString();
    }
}