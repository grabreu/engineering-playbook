using VerticalSlice.Api.Common.Endpoints;

namespace VerticalSlice.Api.Features.TodoItems.CreateTodoItem;

public class CreateTodoItemEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPost("/todo-items", async (CreateTodoItemRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CreateTodoItemCommand(request.TodoListId, request.Title);
            var result = await sender.Send(command, cancellationToken);
            return Results.Created($"/todo-items/{result.Id}", result);
        })
        .WithTags("TodoItems")
        .WithName("CreateTodoItem")
        .Produces<TodoItemDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();
    }

    public record CreateTodoItemRequest(Guid TodoListId, string Title);
}
