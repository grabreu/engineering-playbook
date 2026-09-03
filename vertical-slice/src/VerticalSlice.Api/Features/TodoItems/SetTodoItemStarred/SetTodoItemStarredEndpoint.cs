namespace VerticalSlice.Api.Features.TodoItems.SetTodoItemStarred;

public static class SetTodoItemStarredEndpoint
{
    public static void MapSetTodoItemStarredEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPatch("/todo-items/{id}/star", async (Guid id, SetTodoItemStarredRequest request, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new SetTodoItemStarredCommand(id, request.IsStarred);
            var result = await sender.Send(command, cancellationToken);
            return result.ToNoContent();
        })
        .WithTags("TodoItems")
        .WithName("SetTodoItemStarred")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesValidationProblem();
    }

    public record SetTodoItemStarredRequest(bool IsStarred);
}
