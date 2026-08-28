using VerticalSlice.Api.Data;

namespace VerticalSlice.Api.Features.TodoLists.GetTodoLists;

public class GetTodoListsHandler(ApplicationDbContext dbContext) : IQueryHandler<GetTodoListsQuery, IReadOnlyList<TodoListDto>>
{
    public async ValueTask<IReadOnlyList<TodoListDto>> Handle(GetTodoListsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoLists.AsNoTracking();

        return await queryable
            .Select(ti => new TodoListDto(ti.Id, ti.Name))
            .ToListAsync(cancellationToken);
    }
}
