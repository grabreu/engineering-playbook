using CleanArchitecture.Application.TodoItems.CompleteTodoItem;

namespace CleanArchitecture.Api.Endpoints.TodoItems;

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
