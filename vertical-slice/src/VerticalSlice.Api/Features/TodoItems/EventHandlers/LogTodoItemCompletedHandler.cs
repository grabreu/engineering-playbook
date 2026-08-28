using VerticalSlice.Api.Domain.Events;

namespace VerticalSlice.Api.Features.TodoItems.EventHandlers;

public class LogTodoItemCompletedHandler(ILogger<LogTodoItemCompletedHandler> logger) : INotificationHandler<TodoItemCompletedDomainEvent>
{
    public ValueTask Handle(TodoItemCompletedDomainEvent notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("Todo item {TodoItemId} was completed.", notification.TodoItemId);
        return ValueTask.CompletedTask;
    }
}
