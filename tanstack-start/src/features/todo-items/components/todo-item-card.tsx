import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SquareIcon, StarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { toast } from "~/components/ui/toast";
import { cn } from "~/utils/cn";
import { todoItemMutations } from "../api/mutations";
import { todoItemQueries } from "../api/queries";
import type { TodoItem } from "../types/todo-item";

type TodoItemCardProps = {
  item: TodoItem;
  showUndoOnUnstar?: boolean;
};

export const TodoItemCard = ({ item, showUndoOnUnstar }: TodoItemCardProps) => {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <TodoItemCompleteButton todoItemId={item.id} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item.title}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <TodoItemStarredButton
          todoItemId={item.id}
          isStarred={item.isStarred}
          showUndoOnUnstar={showUndoOnUnstar}
        />
      </ItemActions>
    </Item>
  );
};

type TodoItemStarredButtonProps = {
  todoItemId: string;
  isStarred: boolean;
  showUndoOnUnstar?: boolean;
};

const TodoItemStarredButton = ({
  todoItemId,
  isStarred,
  showUndoOnUnstar,
}: TodoItemStarredButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.star(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });

      if (showUndoOnUnstar && !variables.isStarred) {
        const toastId = toast.add({
          title: "Task removed from Starred",
          actionProps: {
            children: "Undo",
            onClick() {
              toast.close(toastId);
              mutation.mutate({
                todoItemId: variables.todoItemId,
                isStarred: true,
              });
            },
          },
        });
      }
    },
  });

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() =>
        mutation.mutate({
          todoItemId: todoItemId,
          isStarred: !isStarred,
        })
      }
    >
      <StarIcon
        className={cn(
          isStarred
            ? "fill-foreground text-foreground"
            : "text-muted-foreground",
        )}
      />
    </Button>
  );
};

type TodoItemCompleteButtonProps = {
  todoItemId: string;
};

const TodoItemCompleteButton = ({
  todoItemId,
}: TodoItemCompleteButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...todoItemMutations.complete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoItemQueries.all() });
      toast.add({
        title: "Task completed",
      });
    },
  });

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() =>
        mutation.mutate({
          todoItemId: todoItemId,
        })
      }
    >
      <SquareIcon />
    </Button>
  );
};
