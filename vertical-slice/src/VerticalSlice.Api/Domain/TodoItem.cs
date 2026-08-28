using VerticalSlice.Api.Common.Events;
using VerticalSlice.Api.Domain.Events;

namespace VerticalSlice.Api.Domain;

public class TodoItem : HasDomainEventsBase
{
    public TodoItem(Guid todoListId, string title)
    {
        Id = Guid.CreateVersion7();
        TodoListId = todoListId;
        Title = title;
    }

    private TodoItem()
    {
    }

    public Guid Id { get; private set; }
    public Guid TodoListId { get; private set; }
    public string Title { get; private set; } = null!;
    public bool IsCompleted { get; private set; }

    public void Complete()
    {
        if (IsCompleted)
        {
            return;
        }

        IsCompleted = true;
        AddDomainEvent(new TodoItemCompletedDomainEvent(Id));
    }
}
