using VerticalSlice.Api.Data;
using VerticalSlice.Api.Domain;

namespace VerticalSlice.Api.Features.TodoLists.CreateTodoList;

public class CreateTodoListHandler(ApplicationDbContext dbContext) : ICommandHandler<CreateTodoListCommand, TodoListDto>
{
    public async ValueTask<TodoListDto> Handle(CreateTodoListCommand command, CancellationToken cancellationToken)
    {
        var todoList = new TodoList(command.Name);

        dbContext.TodoLists.Add(todoList);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new(todoList.Id, todoList.Name);
    }
}
