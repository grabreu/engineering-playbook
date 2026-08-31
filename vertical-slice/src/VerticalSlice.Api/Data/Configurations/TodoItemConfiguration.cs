using VerticalSlice.Api.Domain.TodoItems;
using VerticalSlice.Api.Domain.TodoLists;

namespace VerticalSlice.Api.Data.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.IsCompleted)
            .IsRequired();

        builder.HasOne<TodoList>()
            .WithMany()
            .HasForeignKey(x => x.TodoListId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
