using CleanArchitecture.Application.Common.Result;

namespace CleanArchitecture.Application.TodoLists.CreateTodoList;

public record CreateTodoListCommand(string Name) : ICommand<Result<TodoListDto>>;
