using OpenAI.Chat;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IChatSessionRepository, ChatSessionRepository>();
var gptSettings = builder.Configuration.GetSection("AiModels:Gpt").Get<ModelSettings>();
var dalleSettings = builder.Configuration.GetSection("AiModels:Dalle").Get<ModelSettings>();
var searchServiceSettings = builder.Configuration.GetSection("SearchService").Get<ModelSettings>();
builder.Services.AddSingleton<IChatSessionFactory>(new ChatSessionFactory(gptSettings!, dalleSettings!, searchServiceSettings!));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowAll");

app.MapFallbackToFile("index.html");

var chatSessionRepository = app.Services.GetService<IChatSessionRepository>();

app.MapGet("api/newChat", () => {
    return chatSessionRepository!.NewSession();
});

app.MapGet("api/chatGreetings/{sessionId}", (Guid sessionId) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GetGreetings();
});

app.MapGet("api/chatCampaign/{sessionId}", (Guid sessionId, string userPrompt, bool useIndex = true) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GetMarketingCampaign(userPrompt, useIndex);
});

app.MapGet("api/chatSocialMediaPost/{sessionId}", (Guid sessionId, string? userPrompt = null) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GenerateSocialMediaPost(userPrompt);
});

app.MapGet("api/chatImage/{sessionId}", (Guid sessionId, string? userPrompt = null) => {
    var chatSession = chatSessionRepository!.GetSession(sessionId);
    return chatSession.GenerateImage(userPrompt);
});

app.MapGet("api/ping", () => {
    return "pong";
});

app.Run();
