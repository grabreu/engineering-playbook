using CleanArchitecture.Application.Common.Result;

namespace CleanArchitecture.Application.TodoItems.CompleteTodoItem;

public record CompleteTodoItemCommand(Guid TodoItemId) : ICommand<Result<Unit>>;
