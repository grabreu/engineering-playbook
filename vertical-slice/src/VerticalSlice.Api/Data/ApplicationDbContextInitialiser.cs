using VerticalSlice.Api.Domain.TodoItems;
using VerticalSlice.Api.Domain.TodoLists;

namespace VerticalSlice.Api.Data;

public static class ApplicationDbContextInitialiser
{
    public static async Task InitialiseDatabaseAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await dbContext.Database.MigrateAsync();
        await dbContext.SeedAsync();
    }

    private static async Task SeedAsync(this ApplicationDbContext dbContext)
    {
        if (await dbContext.TodoLists.AnyAsync())
        {
            return;
        }

        var homeRenovation = new TodoList("Home Renovation");
        var groceries = new TodoList("Groceries");
        var workProjects = new TodoList("Work Projects");
        var readingList = new TodoList("Reading List");
        var fitnessGoals = new TodoList("Fitness Goals");

        dbContext.TodoLists.AddRange(homeRenovation, groceries, workProjects, readingList, fitnessGoals);

        dbContext.TodoItems.AddRange(
            CreateItem(homeRenovation.Id, "Paint the living room"),
            CreateItem(homeRenovation.Id, "Fix the leaky faucet", isStarred: true),
            CreateItem(homeRenovation.Id, "Order kitchen tiles", isCompleted: true),
            CreateItem(homeRenovation.Id, "Repair the fence"),
            CreateItem(groceries.Id, "Buy milk and eggs"),
            CreateItem(groceries.Id, "Get coffee beans", isStarred: true),
            CreateItem(groceries.Id, "Pick up chicken breast", isCompleted: true),
            CreateItem(groceries.Id, "Buy dish soap"),
            CreateItem(workProjects.Id, "Review pull requests", isStarred: true),
            CreateItem(workProjects.Id, "Write quarterly report"),
            CreateItem(workProjects.Id, "Prepare client presentation", isCompleted: true),
            CreateItem(workProjects.Id, "Update project roadmap"),
            CreateItem(readingList.Id, "Finish Atomic Habits", isCompleted: true),
            CreateItem(readingList.Id, "Start Project Hail Mary"),
            CreateItem(readingList.Id, "Discuss book club picks", isStarred: true),
            CreateItem(fitnessGoals.Id, "Run 5k three times this week", isStarred: true),
            CreateItem(fitnessGoals.Id, "Do 20 pushups daily"),
            CreateItem(fitnessGoals.Id, "Complete leg day workout", isCompleted: true),
            CreateItem(fitnessGoals.Id, "Try a new yoga class")
        );

        await dbContext.SaveChangesAsync();
    }

    private static TodoItem CreateItem(Guid todoListId, string title, bool isCompleted = false, bool isStarred = false)
    {
        var item = new TodoItem(todoListId, title);

        if (isStarred)
        {
            item.SetStarred(true);
        }

        if (isCompleted)
        {
            item.Complete();
        }

        return item;
    }
}
