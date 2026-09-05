using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public class GetTodoListsHandler(ApplicationDbContext dbContext) : IQueryHandler<GetTodoListsQuery, Result<IReadOnlyList<TodoListDto>>>
{
    public async ValueTask<Result<IReadOnlyList<TodoListDto>>> Handle(GetTodoListsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoLists.AsNoTracking();

        return await queryable
            .OrderBy(tl => tl.Id)
            .Select(tl => new TodoListDto(tl.Id, tl.Name))
            .ToListAsync(cancellationToken);
    }
}
