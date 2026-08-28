namespace VerticalSlice.Api.Features.TodoItems.CreateTodoItem;

public static class CreateTodoItemEndpoint
{
    public static IEndpointRouteBuilder MapCreateTodoItemEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/todo-items", async (CreateTodoItemRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CreateTodoItemCommand(request.TodoListId, request.Title);
            var result = await sender.Send(command, cancellationToken);
            return Results.Created($"/todo-items/{result.Id}", result);
        })
        .WithTags("TodoItems")
        .WithName("CreateTodoItem")
        .Produces<TodoItemDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();

        return endpoints;
    }

    public record CreateTodoItemRequest(Guid TodoListId, string Title);
}
