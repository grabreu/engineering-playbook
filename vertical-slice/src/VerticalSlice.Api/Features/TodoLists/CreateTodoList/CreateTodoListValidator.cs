namespace VerticalSlice.Api.Features.TodoLists.CreateTodoList;

public class CreateTodoListValidator : AbstractValidator<CreateTodoListCommand>
{
    public CreateTodoListValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(200);
    }
}
