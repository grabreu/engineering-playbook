import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
import { SidebarMenuButton } from "~/components/ui/sidebar";
import { toast } from "~/components/ui/toast";
import { todoListMutations } from "./todo-lists.mutations";
import { todoListQueries } from "./todo-lists.queries";

export const TodoListCreateDialog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoListMutations.create(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: todoListQueries.all() });

      const toastId = toast.add({
        title: "List created",
        actionProps: {
          children: "View",
          onClick() {
            toast.close(toastId);
            navigate({
              to: "/list/$todoListId",
              params: { todoListId: data.id },
            });
          },
        },
      });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: z.object({
        name: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate({
        name: value.name,
      });
    },
  });

  return (
    <FormModal
      title="Create new list"
      trigger={
        <SidebarMenuButton>
          <PlusIcon />
          Create new list
        </SidebarMenuButton>
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
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
