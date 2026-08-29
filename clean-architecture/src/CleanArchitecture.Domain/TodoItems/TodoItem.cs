using CleanArchitecture.Domain.Common.Events;
using CleanArchitecture.Domain.Common.Exceptions;
using CleanArchitecture.Domain.TodoItems.Events;

namespace CleanArchitecture.Domain.TodoItems;

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
            throw new DomainException($"Todo item '{Id}' is already completed.");
        }

        IsCompleted = true;
        AddDomainEvent(new TodoItemCompletedDomainEvent(Id));
    }
}
