import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import { useTodoLists } from "~/features/todo-lists/api/get-todo-lists";

export const NavTodoLists = () => {
  const todoListsQuery = useTodoLists();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible render={<SidebarMenuItem />} defaultOpen>
            <SidebarMenuButton>Lists</SidebarMenuButton>
            <CollapsibleTrigger
              render={<SidebarMenuAction />}
              className="data-panel-open:rotate-90"
            >
              <ChevronRightIcon />
              <span className="sr-only">Toggle</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {todoListsQuery.data?.map((todoList) => (
                  <SidebarMenuSubItem key={todoList.id}>
                    <SidebarMenuSubButton render={<Link to="/" />}>
                      {todoList.name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
