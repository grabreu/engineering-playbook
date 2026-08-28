namespace VerticalSlice.Api.Features.TodoItems.CreateTodoItem;

public class CreateTodoItemValidator : AbstractValidator<CreateTodoItemCommand>
{
    public CreateTodoItemValidator()
    {
        RuleFor(x => x.TodoListId)
            .NotEmpty();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);
    }
}
