namespace VerticalSlice.Api.Features.TodoLists.CreateTodoList;

public record CreateTodoListCommand(string Name) : ICommand<TodoListDto>;
