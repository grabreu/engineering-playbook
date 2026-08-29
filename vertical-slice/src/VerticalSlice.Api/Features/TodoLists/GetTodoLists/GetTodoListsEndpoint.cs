using VerticalSlice.Api.Common.Endpoints;
using VerticalSlice.Api.Common.Result;

namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public class GetTodoListsEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
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
