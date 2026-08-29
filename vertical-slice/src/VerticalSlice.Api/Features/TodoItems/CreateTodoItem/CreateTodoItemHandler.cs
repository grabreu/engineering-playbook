using VerticalSlice.Api.Common.Result;
using VerticalSlice.Api.Data;
using VerticalSlice.Api.Domain;

namespace VerticalSlice.Api.Features.TodoItems.CreateTodoItem;

public class CreateTodoItemHandler(ApplicationDbContext dbContext) : ICommandHandler<CreateTodoItemCommand, Result<TodoItemDto>>
{
    public async ValueTask<Result<TodoItemDto>> Handle(CreateTodoItemCommand command, CancellationToken cancellationToken)
    {
        if (!await dbContext.TodoLists.AnyAsync(t => t.Id == command.TodoListId, cancellationToken))
        {
            return Error.NotFound("TodoLists.NotFound", $"Todo list '{command.TodoListId}' was not found.");
        }

        var todoItem = new TodoItem(command.TodoListId, command.Title);

        dbContext.TodoItems.Add(todoItem);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new TodoItemDto(todoItem.Id, todoItem.TodoListId, todoItem.Title, todoItem.IsCompleted);
    }
}
