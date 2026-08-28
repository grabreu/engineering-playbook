namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public static class GetTodoListsEndpoint
{
    public static IEndpointRouteBuilder MapGetTodoListsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/todo-lists", async (ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoListsQuery();
            var todoLists = await sender.Send(query, cancellationToken);
            return Results.Ok(todoLists);
        })
        .WithTags("TodoLists")
        .WithName("GetTodoLists")
        .Produces<IReadOnlyList<TodoListDto>>(StatusCodes.Status200OK);

        return endpoints;
    }
}
