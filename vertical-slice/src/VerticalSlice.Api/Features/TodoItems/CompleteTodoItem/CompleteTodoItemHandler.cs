using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public class CompleteTodoItemHandler(ApplicationDbContext dbContext) : ICommandHandler<CompleteTodoItemCommand, Result<Unit>>
{
    public async ValueTask<Result<Unit>> Handle(CompleteTodoItemCommand command, CancellationToken cancellationToken)
    {
        var todoItem = await dbContext.TodoItems.FindAsync([command.TodoItemId], cancellationToken);

        if (todoItem is null)
        {
            return Error.NotFound("TodoItem.NotFound", $"Todo item '{command.TodoItemId}' was not found.");
        }

        todoItem.Complete();

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
