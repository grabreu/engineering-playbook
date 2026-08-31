using CleanArchitecture.Domain.SeedWork;

namespace CleanArchitecture.Domain.TodoItems.Events;

public record TodoItemCompletedDomainEvent(Guid TodoItemId) : IDomainEvent;
