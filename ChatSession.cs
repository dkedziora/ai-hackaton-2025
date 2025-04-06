using OpenAI.Chat;

public class ChatSession
{
    private readonly TextModelClient _textModelClient;
    private readonly ImageModelClient _imageModelClient;

    private string campaignDescription = string.Empty;

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

        return await _textModelClient.Prompt(messages);
    }

    public async Task<string> GetMarketingCampaign(string companyDescription)
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are a professional marketing specialist helping companies to create marketing campaigns."),
            new SystemChatMessage("You will get some information about the client company, prepare a marketing campaign based on this."),
            new SystemChatMessage("Avoid asking questions, just provide the marketing campaign."),
            new UserChatMessage(companyDescription)
        };

        campaignDescription = await _textModelClient.Prompt(messages);
        return campaignDescription;
    }

    public async Task<string> GenerateSocialMediaPost()
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are a professional marketing specialist helping companies to create social media content."),
            new SystemChatMessage("You will get company marketing campaign, based on this prepare a social media post that can be used in the campaign."),
            new UserChatMessage(campaignDescription)
        };
        
        return await _textModelClient.Prompt(messages);;
    }
}