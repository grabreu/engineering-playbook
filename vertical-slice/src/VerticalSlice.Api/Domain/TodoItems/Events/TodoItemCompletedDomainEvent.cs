using VerticalSlice.Api.Domain.SeedWork;

namespace VerticalSlice.Api.Domain.TodoItems.Events;

public record TodoItemCompletedDomainEvent(Guid TodoItemId) : IDomainEvent;
