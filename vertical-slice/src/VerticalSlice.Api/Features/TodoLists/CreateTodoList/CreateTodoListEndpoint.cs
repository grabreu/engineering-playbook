using VerticalSlice.Api.Common.Endpoints;
using VerticalSlice.Api.Common.Result;

namespace VerticalSlice.Api.Features.TodoLists.CreateTodoList;

public class CreateTodoListEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPost("/todo-lists", async (CreateTodoListRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CreateTodoListCommand(request.Name);
            var result = await sender.Send(command, cancellationToken);
            return result.ToCreated(value => $"/todo-lists/{value.Id}");
        })
        .WithTags("TodoLists")
        .WithName("CreateTodoList")
        .Produces<TodoListDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();
    }

    public record CreateTodoListRequest(string Name);
}
