using CleanArchitecture.Application.TodoItems;
using CleanArchitecture.Application.TodoItems.GetTodoItems;

namespace CleanArchitecture.Api.Endpoints.TodoItems;

public static class GetTodoItemsEndpoint
{
    public static IEndpointRouteBuilder MapGetTodoItemsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/todo-items", async (Guid? todoListId, ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoItemsQuery(todoListId);
            var todoItems = await sender.Send(query, cancellationToken);
            return Results.Ok(todoItems);
        })
        .WithTags("TodoItems")
        .WithName("GetTodoItems")
        .Produces<IReadOnlyList<TodoItemDto>>(StatusCodes.Status200OK);

        return endpoints;
    }
}
