using VerticalSlice.Api.Common.Events;

namespace VerticalSlice.Api.Domain.Events;

public record TodoItemCompletedDomainEvent(Guid TodoItemId) : IDomainEvent;
