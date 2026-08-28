namespace CleanArchitecture.Application.TodoItems.CompleteTodoItem;

public record CompleteTodoItemCommand(Guid TodoItemId) : ICommand;
