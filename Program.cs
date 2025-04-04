using OpenAI.Chat;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

var endpoint = builder.Configuration.GetValue<string>("AzureEndpoint");
var gptSettings = builder.Configuration.GetSection("AiModels:Gpt").Get<ModelSettings>();
//var dalleSettings = builder.Configuration.GetSection("AiModels:dalle") as ModelSettings;

app.MapGet("api/prompt", (string prompt) => {
    var gptModel = new AiModel(endpoint!, gptSettings!);
  
    var campaignPromptMessagess = new List<ChatMessage>  
    {  
        new SystemChatMessage("You are profesional marketing specialist helping companies to create marketing campaign."),
        new SystemChatMessage("You will get some information about client company, prepare marketing company based on this."),
        new UserChatMessage(prompt)
    };

    var campaignPromptOptions = new ChatCompletionOptions{  
        Temperature = (float)0.7,  
        MaxOutputTokenCount = 800,  
        
        TopP=(float)0.95,  
        FrequencyPenalty=(float)0,  
        PresencePenalty=(float)0
    };

    return gptModel.Prompt(campaignPromptMessagess, campaignPromptOptions);
});

app.MapGet("api/ping", () => {
    return "pong";
});

app.Run();
