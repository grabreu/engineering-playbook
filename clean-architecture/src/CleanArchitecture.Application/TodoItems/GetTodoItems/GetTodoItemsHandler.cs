using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.TodoItems.GetTodoItems;

public class GetTodoItemsHandler(IApplicationDbContext dbContext) : IQueryHandler<GetTodoItemsQuery, IReadOnlyList<TodoItemDto>>
{
    public async ValueTask<IReadOnlyList<TodoItemDto>> Handle(GetTodoItemsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoItems.AsNoTracking();

        if (query.TodoListId.HasValue)
        {
            queryable = queryable.Where(ti => ti.TodoListId == query.TodoListId.Value);
        }

        return await queryable
            .Select(ti => new TodoItemDto(ti.Id, ti.TodoListId, ti.Title, ti.IsCompleted))
            .ToListAsync(cancellationToken);
    }
}
