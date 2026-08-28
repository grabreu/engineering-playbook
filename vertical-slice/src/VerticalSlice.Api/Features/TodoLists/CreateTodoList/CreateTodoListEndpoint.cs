namespace VerticalSlice.Api.Features.TodoLists.CreateTodoList;

public static class CreateTodoListEndpoint
{
    public static IEndpointRouteBuilder MapCreateTodoListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/todo-lists", async (CreateTodoListRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CreateTodoListCommand(request.Name);
            var result = await sender.Send(command, cancellationToken);
            return Results.Created($"/todo-lists/{result.Id}", result);
        })
        .WithTags("TodoLists")
        .WithName("CreateTodoList")
        .Produces<TodoListDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();

        return endpoints;
    }

    public record CreateTodoListRequest(string Name);
}
