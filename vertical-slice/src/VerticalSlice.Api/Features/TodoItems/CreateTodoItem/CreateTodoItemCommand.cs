namespace VerticalSlice.Api.Features.TodoItems.CreateTodoItem;

public record CreateTodoItemCommand(Guid TodoListId, string Title) : ICommand<TodoItemDto>;
