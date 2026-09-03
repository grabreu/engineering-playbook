import { useForm } from "@tanstack/react-form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import {
  CreateTodoListInputSchema,
  useCreateTodoList,
} from "~/features/todo-lists/api/create-todo-list";
import { NavMain } from "./nav-main";
import { NavTodoLists } from "./nav-todo-lists";

export const AppSidebar = () => {
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  const createTodoListMutation = useCreateTodoList({
    mutationConfig: {
      onSuccess: () => {
        setIsCreateListOpen(false);
        createTodoListForm.reset();
      },
    },
  });

  const createTodoListForm = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: CreateTodoListInputSchema,
    },
    onSubmit: ({ value }) => {
      createTodoListMutation.mutate({
        data: {
          name: value.name,
        },
      });
    },
  });

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <SidebarContent>
        <NavMain />
        <NavTodoLists />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Dialog
                  open={isCreateListOpen}
                  onOpenChange={(open) => {
                    setIsCreateListOpen(open);
                    if (!open) {
                      createTodoListForm.reset();
                    }
                  }}
                >
                  <DialogTrigger render={<SidebarMenuButton />}>
                    <PlusIcon /> Create new list
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form
                      className="grid gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        createTodoListForm.handleSubmit();
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Create new list</DialogTitle>
                      </DialogHeader>
                      <FieldGroup className="text-sm gap-4">
                        <createTodoListForm.Field name="name">
                          {(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                  Name
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  aria-invalid={isInvalid}
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={field.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        </createTodoListForm.Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" />}>
                          Cancel
                        </DialogClose>
                        <Button type="submit">Done</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
