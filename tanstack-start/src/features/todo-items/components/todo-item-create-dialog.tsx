import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { FormModal } from "~/components/ui/form-modal";
import { Input } from "~/components/ui/input";
import { todoItemMutations } from "../api/mutations";
import { todoItemQueries } from "../api/queries";

type TodoItemCreateDialogProps = {
  todoListId: string;
};

export const TodoItemCreateDialog = ({
  todoListId,
}: TodoItemCreateDialogProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: z.object({
        title: z.string().min(1).max(200),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate({
        todoListId: todoListId,
        title: value.title,
      });
    },
  });

  return (
    <FormModal
      title="Add a task"
      trigger={
        <Button variant="outline">
          <PlusIcon />
          Add a task
        </Button>
      }
      isDone={mutation.isSuccess}
      onClose={() => form.reset()}
      submit={
        <Button type="submit" form={form.formId} disabled={mutation.isPending}>
          Done
        </Button>
      }
    >
      <form
        id={form.formId}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4 text-sm">
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </FormModal>
  );
};
