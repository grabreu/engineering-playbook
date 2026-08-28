namespace VerticalSlice.Api.Features.TodoItems.GetTodoItems;

public record GetTodoItemsQuery(Guid? TodoListId) : IQuery<IReadOnlyList<TodoItemDto>>;
