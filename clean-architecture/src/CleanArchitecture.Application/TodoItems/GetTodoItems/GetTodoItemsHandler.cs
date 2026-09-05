using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.TodoItems.GetTodoItems;

public class GetTodoItemsHandler(IApplicationDbContext dbContext) : IQueryHandler<GetTodoItemsQuery, Result<IReadOnlyList<TodoItemDto>>>
{
    public async ValueTask<Result<IReadOnlyList<TodoItemDto>>> Handle(GetTodoItemsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoItems.AsNoTracking();

        if (query.TodoListId.HasValue)
        {
            queryable = queryable.Where(ti => ti.TodoListId == query.TodoListId.Value);
        }

        if (query.IsCompleted.HasValue)
        {
            queryable = queryable.Where(ti => ti.IsCompleted == query.IsCompleted.Value);
        }

        if (query.IsStarred.HasValue)
        {
            queryable = queryable.Where(ti => ti.IsStarred == query.IsStarred.Value);
        }

        return await queryable
            .OrderBy(ti => ti.Id)
            .Select(ti => new TodoItemDto(ti.Id, ti.TodoListId, ti.Title, ti.IsCompleted, ti.IsStarred))
            .ToListAsync(cancellationToken);
    }
}
