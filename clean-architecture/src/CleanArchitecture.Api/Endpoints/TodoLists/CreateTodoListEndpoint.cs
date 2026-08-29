using CleanArchitecture.Application.TodoLists;
using CleanArchitecture.Application.TodoLists.CreateTodoList;

namespace CleanArchitecture.Api.Endpoints.TodoLists;

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
