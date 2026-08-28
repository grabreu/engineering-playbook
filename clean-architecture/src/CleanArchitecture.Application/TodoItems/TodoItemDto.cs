namespace CleanArchitecture.Application.TodoItems;

public record TodoItemDto(Guid Id, Guid TodoListId, string Title, bool IsCompleted);
