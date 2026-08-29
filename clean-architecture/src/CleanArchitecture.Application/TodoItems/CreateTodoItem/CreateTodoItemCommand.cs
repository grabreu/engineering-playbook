using CleanArchitecture.Application.Common.Result;

namespace CleanArchitecture.Application.TodoItems.CreateTodoItem;

public record CreateTodoItemCommand(Guid TodoListId, string Title) : ICommand<Result<TodoItemDto>>;
