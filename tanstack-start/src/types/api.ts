export type ProblemDetails = {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  traceId?: string;
};

export type TodoList = {
  id: string;
  name: string;
};

export type TodoItem = {
  id: string;
  todoListId: string;
  title: string;
  isStarred: boolean;
  isCompleted: boolean;
};
