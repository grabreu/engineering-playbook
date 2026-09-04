import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";
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
import { todoListQueries } from "~/features/todo-lists/todo-lists.queries";

export const NavTodoLists = () => {
  const query = useSuspenseQuery(todoListQueries.list());

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible render={<SidebarMenuItem />} defaultOpen>
            <SidebarMenuButton>Lists</SidebarMenuButton>
            <CollapsibleTrigger
              render={<SidebarMenuAction />}
              className="data-panel-open:rotate-180"
            >
              <ChevronDownIcon />
              <span className="sr-only">Toggle</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {query.data.map((todoList) => (
                  <SidebarMenuSubItem key={todoList.id}>
                    <SidebarMenuSubButton
                      render={
                        <Link
                          to="/list/$todoListId"
                          params={{ todoListId: todoList.id }}
                        />
                      }
                    >
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
