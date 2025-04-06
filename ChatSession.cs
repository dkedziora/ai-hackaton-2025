using OpenAI.Chat;

public class ChatSession
{
    private readonly TextModelClient _textModelClient;
    private readonly ImageModelClient _imageModelClient;

    private string _campaignDescription = string.Empty;
    private string _companyDescription = string.Empty;

    public ChatSession(TextModelClient textModelClient, ImageModelClient imageModelClient)
    {
        _textModelClient = textModelClient;
        _imageModelClient = imageModelClient;
    }

    public async Task<string> GetGreetings()
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are a professional marketing specialist helping companies to create marketing campaigns."),
            new SystemChatMessage("Your client just entered the chat, greet them and ask how you can help. Ask them to provide information about their company."),
        };

        return await _textModelClient.TextPrompt(messages);
    }

    public async Task<string> GetMarketingCampaign(string companyDescription)
    {
        _companyDescription = companyDescription;
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are a professional marketing specialist helping companies to create marketing campaigns."),
            new SystemChatMessage("You will get some information about the client company, prepare a marketing campaign based on this."),
            new SystemChatMessage("Avoid asking questions, just provide the marketing campaign."),
            new UserChatMessage(companyDescription)
        };

        _campaignDescription = await _textModelClient.TextPrompt(messages);
        return _campaignDescription;
    }

    public async Task<string> GenerateSocialMediaPost(string? userDescription = null)
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are a professional marketing specialist helping companies to create social media content."),
            new SystemChatMessage("You will get company marketing campaign, and optionally additional instructions. Based on this prepare a social media post that can be used in the campaign."),
            new UserChatMessage(_campaignDescription),
            new UserChatMessage(string.IsNullOrWhiteSpace(userDescription) ? "" : $"Additional instructions: {userDescription}"),
        };

        return await _textModelClient.TextPrompt(messages);
    }

    public async Task<string> GenerateImage(string? userDescription = null)
    {
        return await _imageModelClient.ImagePrompt(
            $"Create an image to use in social media post for described company. "
            + "You may get additional instructions. Company description: {_companyDescription}" 
            + (string.IsNullOrWhiteSpace(userDescription) ? "" : $"Additional instructions: {userDescription}"));
    }
}