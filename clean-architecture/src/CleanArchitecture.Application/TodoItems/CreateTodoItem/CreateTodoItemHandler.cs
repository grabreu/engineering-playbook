using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.TodoItems;

namespace CleanArchitecture.Application.TodoItems.CreateTodoItem;

public class CreateTodoItemHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateTodoItemCommand, TodoItemDto>
{
    public async ValueTask<TodoItemDto> Handle(CreateTodoItemCommand command, CancellationToken cancellationToken)
    {
        if (!await dbContext.TodoLists.AnyAsync(t => t.Id == command.TodoListId, cancellationToken))
        {
            throw new InvalidOperationException($"Todo list '{command.TodoListId}' was not found.");
        }

        var todoItem = new TodoItem(command.TodoListId, command.Title);

        dbContext.TodoItems.Add(todoItem);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new(todoItem.Id, todoItem.TodoListId, todoItem.Title, todoItem.IsCompleted);
    }
}
