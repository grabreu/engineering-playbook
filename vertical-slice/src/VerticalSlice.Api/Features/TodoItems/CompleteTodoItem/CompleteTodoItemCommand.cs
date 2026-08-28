namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public record CompleteTodoItemCommand(Guid TodoItemId) : ICommand;
