namespace CleanArchitecture.Application.TodoItems.SetTodoItemStarred;

public class SetTodoItemStarredValidator : AbstractValidator<SetTodoItemStarredCommand>
{
    public SetTodoItemStarredValidator()
    {
        RuleFor(x => x.TodoItemId)
            .NotEmpty();
    }
}
