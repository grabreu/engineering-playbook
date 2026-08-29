using CleanArchitecture.Application.TodoItems;
using CleanArchitecture.Application.TodoItems.CreateTodoItem;

namespace CleanArchitecture.Api.Endpoints.TodoItems;

public class CreateTodoItemEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPost("/todo-items", async (CreateTodoItemRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CreateTodoItemCommand(request.TodoListId, request.Title);
            var result = await sender.Send(command, cancellationToken);
            return result.ToCreated(value => $"/todo-items/{value.Id}");
        })
        .WithTags("TodoItems")
        .WithName("CreateTodoItem")
        .Produces<TodoItemDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();
    }

    public record CreateTodoItemRequest(Guid TodoListId, string Title);
}
