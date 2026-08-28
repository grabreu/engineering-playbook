using CleanArchitecture.Domain.Common.Events;

namespace CleanArchitecture.Domain.TodoItems.Events;

public record TodoItemCompletedDomainEvent(Guid TodoItemId) : IDomainEvent;
