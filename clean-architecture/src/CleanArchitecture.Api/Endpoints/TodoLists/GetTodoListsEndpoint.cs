using CleanArchitecture.Application.TodoLists;
using CleanArchitecture.Application.TodoLists.GetTodoLists;

namespace CleanArchitecture.Api.Endpoints.TodoLists;

public static class GetTodoListsEndpoint
{
    public static void MapGetTodoListsEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet("/todo-lists", async (ISender sender, CancellationToken cancellationToken) =>
        {
            var query = new GetTodoListsQuery();
            var result = await sender.Send(query, cancellationToken);
            return result.ToOk();
        })
        .WithTags("TodoLists")
        .WithName("GetTodoLists")
        .Produces<IReadOnlyList<TodoListDto>>(StatusCodes.Status200OK);
    }
}
