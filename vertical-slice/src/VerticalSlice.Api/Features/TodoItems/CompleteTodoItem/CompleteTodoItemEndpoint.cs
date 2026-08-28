namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public static class CompleteTodoItemEndpoint
{
    public static IEndpointRouteBuilder MapCompleteTodoItemEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPatch("/todo-items/{id}/complete", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CompleteTodoItemCommand(id);
            var result = await sender.Send(command, cancellationToken);
            return Results.NoContent();
        })
        .WithTags("TodoItems")
        .WithName("CompleteTodoItem")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesValidationProblem();

        return endpoints;
    }
}
