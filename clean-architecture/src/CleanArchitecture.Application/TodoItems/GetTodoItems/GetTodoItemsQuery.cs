namespace CleanArchitecture.Application.TodoItems.GetTodoItems;

public record GetTodoItemsQuery(Guid? TodoListId) : IQuery<IReadOnlyList<TodoItemDto>>;
