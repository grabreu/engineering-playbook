using VerticalSlice.Api.Common.Endpoints;

namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public class CompleteTodoItemEndpoint : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPatch("/todo-items/{id}/complete", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
        {
            var command = new CompleteTodoItemCommand(id);
            var result = await sender.Send(command, cancellationToken);
            return Results.NoContent();
        })
        .WithTags("TodoItems")
        .WithName("CompleteTodoItem")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesValidationProblem();
    }
}
