import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { TodoListCreateDialog } from "~/features/todo-lists/todo-lists.components";
import { NavMain } from "./nav-main";
import { NavTodoLists } from "./nav-todo-lists";

export const AppSidebar = () => {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <SidebarContent>
        <NavMain />
        <NavTodoLists />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TodoListCreateDialog />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
