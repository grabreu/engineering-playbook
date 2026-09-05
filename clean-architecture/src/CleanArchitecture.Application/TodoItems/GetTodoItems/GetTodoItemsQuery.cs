namespace CleanArchitecture.Application.TodoItems.GetTodoItems;

public record GetTodoItemsQuery(Guid? TodoListId, bool? IsCompleted, bool? IsStarred) : IQuery<Result<IReadOnlyList<TodoItemDto>>>;
