using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public class GetTodoListsHandler(ApplicationDbContext dbContext) : IQueryHandler<GetTodoListsQuery, Result<IReadOnlyList<TodoListDto>>>
{
    public async ValueTask<Result<IReadOnlyList<TodoListDto>>> Handle(GetTodoListsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoLists.AsNoTracking();

        return await queryable
            .Select(ti => new TodoListDto(ti.Id, ti.Name))
            .ToListAsync(cancellationToken);
    }
}
