using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.TodoLists;

namespace CleanArchitecture.Application.TodoLists.CreateTodoList;

public class CreateTodoListHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateTodoListCommand, TodoListDto>
{
    public async ValueTask<TodoListDto> Handle(CreateTodoListCommand command, CancellationToken cancellationToken)
    {
        var todoList = new TodoList(command.Name);

        dbContext.TodoLists.Add(todoList);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new(todoList.Id, todoList.Name);
    }
}
