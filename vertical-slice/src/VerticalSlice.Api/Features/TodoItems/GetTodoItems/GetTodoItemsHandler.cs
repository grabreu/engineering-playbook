using VerticalSlice.Api.Common.Result;
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

        return await queryable
            .Select(ti => new TodoItemDto(ti.Id, ti.TodoListId, ti.Title, ti.IsCompleted))
            .ToListAsync(cancellationToken);
    }
}
