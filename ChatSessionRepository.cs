public interface IChatSessionRepository
{
    ChatSession GetSession(Guid sessionId);
    Guid NewSession();
}

public class ChatSessionRepository : IChatSessionRepository
{
    private IChatSessionFactory _chatSessionFactory;
    private Dictionary<Guid, ChatSession> _chatSessions = [];

    public ChatSessionRepository(IChatSessionFactory chatSessionFactory)
    {
        _chatSessionFactory = chatSessionFactory;
    }

    public Guid NewSession()
    {
        var sessionId = Guid.NewGuid();
        _chatSessions.Add(sessionId, _chatSessionFactory.NewChatSession());
        return sessionId;
    }

    public ChatSession GetSession(Guid sessionId) => _chatSessions[sessionId];
}