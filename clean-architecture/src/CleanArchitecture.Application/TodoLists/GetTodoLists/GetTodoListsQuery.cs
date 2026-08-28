namespace CleanArchitecture.Application.TodoLists.GetTodoLists;

public record GetTodoListsQuery : IQuery<IReadOnlyList<TodoListDto>>;
