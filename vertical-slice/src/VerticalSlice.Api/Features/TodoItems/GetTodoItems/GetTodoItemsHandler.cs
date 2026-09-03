using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoItems.GetTodoItems;

public class GetTodoItemsHandler(ApplicationDbContext dbContext) : IQueryHandler<GetTodoItemsQuery, Result<IReadOnlyList<TodoItemDto>>>
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
            .Select(ti => new TodoItemDto(ti.Id, ti.TodoListId, ti.Title, ti.IsCompleted, ti.IsStarred))
            .ToListAsync(cancellationToken);
    }
}
