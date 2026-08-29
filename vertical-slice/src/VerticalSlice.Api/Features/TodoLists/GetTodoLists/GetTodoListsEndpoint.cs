using VerticalSlice.Api.Common.Endpoints;

namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public class GetTodoListsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/todo-lists", async (ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoListsQuery();
            var todoLists = await sender.Send(query, cancellationToken);
            return Results.Ok(todoLists);
        })
        .WithTags("TodoLists")
        .WithName("GetTodoLists")
        .Produces<IReadOnlyList<TodoListDto>>(StatusCodes.Status200OK);
    }
}
