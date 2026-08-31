namespace VerticalSlice.Api.Features.TodoItems.GetTodoItems;

public static class GetTodoItemsEndpoint
{
    public static void MapGetTodoItemsEndpoint(this IEndpointRouteBuilder app)
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
