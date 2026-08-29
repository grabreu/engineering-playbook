using VerticalSlice.Api.Common.Endpoints;

namespace VerticalSlice.Api.Features.TodoItems.GetTodoItems;

public class GetTodoItemsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/todo-items", async (Guid? todoListId, ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoItemsQuery(todoListId);
            var todoItems = await sender.Send(query, cancellationToken);
            return Results.Ok(todoItems);
        })
        .WithTags("TodoItems")
        .WithName("GetTodoItems")
        .Produces<IReadOnlyList<TodoItemDto>>(StatusCodes.Status200OK);
    }
}
