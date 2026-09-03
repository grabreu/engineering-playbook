namespace VerticalSlice.Api.Features.TodoItems.GetTodoItems;

public record GetTodoItemsQuery(Guid? TodoListId, bool? IsCompleted, bool? IsStarred) : IQuery<Result<IReadOnlyList<TodoItemDto>>>;
