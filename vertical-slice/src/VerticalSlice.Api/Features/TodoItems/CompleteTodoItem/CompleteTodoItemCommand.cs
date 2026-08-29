using VerticalSlice.Api.Common.Result;

namespace VerticalSlice.Api.Features.TodoItems.CompleteTodoItem;

public record CompleteTodoItemCommand(Guid TodoItemId) : ICommand<Result<Unit>>;
