using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Result;
using CleanArchitecture.Domain.TodoLists;

namespace CleanArchitecture.Application.TodoLists.CreateTodoList;

public class CreateTodoListHandler(IApplicationDbContext dbContext) : ICommandHandler<CreateTodoListCommand, Result<TodoListDto>>
{
    public async ValueTask<Result<TodoListDto>> Handle(CreateTodoListCommand command, CancellationToken cancellationToken)
    {
        var todoList = new TodoList(command.Name);

        dbContext.TodoLists.Add(todoList);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new TodoListDto(todoList.Id, todoList.Name);
    }
}
