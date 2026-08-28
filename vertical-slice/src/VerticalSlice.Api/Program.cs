using VerticalSlice.Api.Common.Behaviors;
using VerticalSlice.Api.Common.ExceptionHandling;
using VerticalSlice.Api.Data;
using VerticalSlice.Api.Data.Interceptors;
using VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;
using VerticalSlice.Api.Features.TodoItems.CreateTodoItem;
using VerticalSlice.Api.Features.TodoItems.GetTodoItems;
using VerticalSlice.Api.Features.TodoLists.CreateTodoList;
using VerticalSlice.Api.Features.TodoLists.GetTodoLists;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext();
});

builder.Services.AddOpenApi();

builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddMediator(options =>
{
    options.ServiceLifetime = ServiceLifetime.Scoped;
    options.PipelineBehaviors =
    [
        typeof(ValidationBehavior<,>)
    ];
});

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<DispatchDomainEventsInterceptor>();

builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .AddInterceptors(sp.GetRequiredService<DispatchDomainEventsInterceptor>());
});

var app = builder.Build();

app.UseSerilogRequestLogging();
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.Map("/", () => Results.Redirect("/scalar"));
}

app.MapCreateTodoListEndpoint();
app.MapGetTodoListsEndpoint();

app.MapCreateTodoItemEndpoint();
app.MapGetTodoItemsEndpoint();
app.MapCompleteTodoItemEndpoint();

if (app.Environment.IsDevelopment())
{
    await app.Services.InitialiseDatabaseAsync();
}

await app.RunAsync();
