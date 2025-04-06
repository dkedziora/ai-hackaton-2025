public interface IChatSessionFactory
{
    ChatSession NewChatSession();
}

public class ChatSessionFactory : IChatSessionFactory
{
    private ModelSettings _textModelSettings;
    private ModelSettings _imageModelSettings;

    public ChatSessionFactory(ModelSettings textModelSettings, ModelSettings imageModelSettings)
    {
        _textModelSettings = textModelSettings;
        _imageModelSettings = imageModelSettings;
    }

    public ChatSession NewChatSession()
    {
        return new ChatSession(
            new TextModelClient(_textModelSettings),
            new ImageModelClient(_imageModelSettings));
    }
}
