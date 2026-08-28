using CleanArchitecture.Application.TodoLists;

namespace CleanArchitecture.Application.TodoLists.CreateTodoList;

public record CreateTodoListCommand(string Name) : ICommand<TodoListDto>;
