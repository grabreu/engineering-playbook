namespace VerticalSlice.Api.Domain.TodoLists;

public class TodoList
{
    public TodoList(string name)
    {
        Id = Guid.CreateVersion7();
        Name = name;
    }

    private TodoList()
    {
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
}
