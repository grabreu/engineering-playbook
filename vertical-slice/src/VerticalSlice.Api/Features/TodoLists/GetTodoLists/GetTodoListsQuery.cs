namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public record GetTodoListsQuery : IQuery<Result<IReadOnlyList<TodoListDto>>>;
