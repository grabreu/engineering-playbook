using CleanArchitecture.Application.TodoItems;
using CleanArchitecture.Application.TodoItems.GetTodoItems;

namespace CleanArchitecture.Api.Endpoints.TodoItems;

public class GetTodoItemsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/todo-items", async (Guid? todoListId, ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoItemsQuery(todoListId);
            var result = await sender.Send(query, cancellationToken);
            return result.ToOk();
        })
        .WithTags("TodoItems")
        .WithName("GetTodoItems")
        .Produces<IReadOnlyList<TodoItemDto>>(StatusCodes.Status200OK);
    }
}
