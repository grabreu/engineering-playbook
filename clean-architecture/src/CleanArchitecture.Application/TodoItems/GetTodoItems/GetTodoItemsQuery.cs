namespace CleanArchitecture.Application.TodoItems.GetTodoItems;

public record GetTodoItemsQuery(Guid? TodoListId) : IQuery<Result<IReadOnlyList<TodoItemDto>>>;
