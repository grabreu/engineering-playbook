using CleanArchitecture.Application.TodoItems;

namespace CleanArchitecture.Application.TodoItems.CreateTodoItem;

public record CreateTodoItemCommand(Guid TodoListId, string Title) : ICommand<TodoItemDto>;
