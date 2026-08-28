using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.TodoItems.CompleteTodoItem;

public class CompleteTodoItemHandler(IApplicationDbContext dbContext) : ICommandHandler<CompleteTodoItemCommand>
{
    public async ValueTask<Unit> Handle(CompleteTodoItemCommand command, CancellationToken cancellationToken)
    {
        var todoItem = await dbContext.TodoItems.FindAsync([command.TodoItemId], cancellationToken);

        if (todoItem is null)
        {
            throw new InvalidOperationException($"Todo item '{command.TodoItemId}' was not found.");
        }

        todoItem.Complete();

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
