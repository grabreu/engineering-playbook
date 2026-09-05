using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.TodoItems;

namespace CleanArchitecture.Application.TodoItems.CreateTodoItem;

public class CreateTodoItemHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateTodoItemCommand, Result<TodoItemDto>>
{
    public async ValueTask<Result<TodoItemDto>> Handle(CreateTodoItemCommand command, CancellationToken cancellationToken)
    {
        if (!await dbContext.TodoLists.AnyAsync(tl => tl.Id == command.TodoListId, cancellationToken))
        {
            return Error.NotFound("TodoLists.NotFound", $"Todo list '{command.TodoListId}' was not found.");
        }

        var todoItem = new TodoItem(command.TodoListId, command.Title);

        dbContext.TodoItems.Add(todoItem);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new TodoItemDto(todoItem.Id, todoItem.TodoListId, todoItem.Title, todoItem.IsCompleted, todoItem.IsStarred);
    }
}
