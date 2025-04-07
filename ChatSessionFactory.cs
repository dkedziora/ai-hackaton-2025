public interface IChatSessionFactory
{
    ChatSession NewChatSession();
}

public class ChatSessionFactory : IChatSessionFactory
{
    private ModelSettings _textModelSettings;
    private ModelSettings _imageModelSettings;

    private ModelSettings _searchServiceSettings;

    public ChatSessionFactory(
        ModelSettings textModelSettings, 
        ModelSettings imageModelSettings,
        ModelSettings searchServiceSettings)
    {
        _textModelSettings = textModelSettings;
        _imageModelSettings = imageModelSettings;
        _searchServiceSettings = searchServiceSettings;
    }

    public ChatSession NewChatSession()
    {
        return new ChatSession(
            new TextModelClient(_textModelSettings),
            new ImageModelClient(_imageModelSettings),
            new SearchServiceClient(_searchServiceSettings));
    }
}
