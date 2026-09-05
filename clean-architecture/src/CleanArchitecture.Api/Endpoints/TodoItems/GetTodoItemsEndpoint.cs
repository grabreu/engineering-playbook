using CleanArchitecture.Application.TodoItems;
using CleanArchitecture.Application.TodoItems.GetTodoItems;

namespace CleanArchitecture.Api.Endpoints.TodoItems;

public static class GetTodoItemsEndpoint
{
    public static void MapGetTodoItemsEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet("/todo-items", async (Guid? todoListId, bool? isCompleted, bool? isStarred, ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoItemsQuery(todoListId, isCompleted, isStarred);
            var result = await sender.Send(query, cancellationToken);
            return result.ToOk();
        })
        .WithTags("TodoItems")
        .WithName("GetTodoItems")
        .Produces<IReadOnlyList<TodoItemDto>>(StatusCodes.Status200OK);
    }
}
