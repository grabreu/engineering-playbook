using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoItems.SetTodoItemStarred;

public class SetTodoItemStarredHandler(ApplicationDbContext dbContext) : ICommandHandler<SetTodoItemStarredCommand, Result<Unit>>
{
    public async ValueTask<Result<Unit>> Handle(SetTodoItemStarredCommand command, CancellationToken cancellationToken)
    {
        var todoItem = await dbContext.TodoItems.FindAsync([command.TodoItemId], cancellationToken);

        if (todoItem is null)
        {
            return Error.NotFound("TodoItem.NotFound", $"Todo item '{command.TodoItemId}' was not found.");
        }

        todoItem.SetStarred(command.IsStarred);

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
