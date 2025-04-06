using OpenAI.Chat;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IChatSessionRepository, ChatSessionRepository>();
var gptSettings = builder.Configuration.GetSection("AiModels:Gpt").Get<ModelSettings>();
var dalleSettings = builder.Configuration.GetSection("AiModels:Dalle").Get<ModelSettings>();
builder.Services.AddSingleton<IChatSessionFactory>(new ChatSessionFactory(gptSettings!, dalleSettings!));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

var chatSessionRepository = app.Services.GetService<IChatSessionRepository>();

app.MapGet("api/newChat", () => {
    return chatSessionRepository!.NewSession();
});

app.MapGet("api/chatGreetings/{sessionId}", (Guid sessionId) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GetGreetings();
});

app.MapGet("api/chatCampaign/{sessionId}", (Guid sessionId, string userPrompt) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GetMarketingCampaign(userPrompt);
});

app.MapGet("api/chatSocialMediaPost/{sessionId}", (Guid sessionId) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GenerateSocialMediaPost();
});

app.MapGet("api/ping", () => {
    return "pong";
});

app.Run();
