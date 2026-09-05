namespace CleanArchitecture.Application.TodoItems.SetTodoItemStarred;

public record SetTodoItemStarredCommand(Guid TodoItemId, bool IsStarred) : ICommand<Result<Unit>>;
