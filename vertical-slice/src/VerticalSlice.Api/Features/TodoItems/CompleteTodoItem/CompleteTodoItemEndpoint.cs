namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public static class CompleteTodoItemEndpoint
{
    public static void MapCompleteTodoItemEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPatch("/todo-items/{id}/complete", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CompleteTodoItemCommand(id);
            var result = await sender.Send(command, cancellationToken);
            return result.ToNoContent();
        })
        .WithTags("TodoItems")
        .WithName("CompleteTodoItem")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesValidationProblem();
    }
}
