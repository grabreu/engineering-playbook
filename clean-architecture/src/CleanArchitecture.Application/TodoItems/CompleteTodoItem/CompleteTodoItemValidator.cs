namespace CleanArchitecture.Application.TodoItems.CompleteTodoItem;

public class CompleteTodoItemValidator : AbstractValidator<CompleteTodoItemCommand>
{
    public CompleteTodoItemValidator()
    {
        RuleFor(x => x.TodoItemId)
            .NotEmpty();
    }
}
