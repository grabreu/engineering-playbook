namespace CleanArchitecture.Application.TodoLists.GetTodoLists;

public record GetTodoListsQuery : IQuery<Result<IReadOnlyList<TodoListDto>>>;
