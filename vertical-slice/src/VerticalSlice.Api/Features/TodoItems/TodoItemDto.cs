namespace VerticalSlice.Api.Features.TodoItems;

public record TodoItemDto(Guid Id, Guid TodoListId, string Title, bool IsCompleted, bool IsStarred);
