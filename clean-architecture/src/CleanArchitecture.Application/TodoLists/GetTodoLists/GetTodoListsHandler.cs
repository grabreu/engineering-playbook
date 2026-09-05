using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.TodoLists.GetTodoLists;

public class GetTodoListsHandler(IApplicationDbContext dbContext) : IQueryHandler<GetTodoListsQuery, Result<IReadOnlyList<TodoListDto>>>
{
    public async ValueTask<Result<IReadOnlyList<TodoListDto>>> Handle(GetTodoListsQuery query, CancellationToken cancellationToken)
    {
        var queryable = dbContext.TodoLists.AsNoTracking();

        return await queryable
            .Select(tl => new TodoListDto(tl.Id, tl.Name))
            .ToListAsync(cancellationToken);
    }
}
