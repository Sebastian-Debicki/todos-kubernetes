export interface Todo {
  id: string;
  title: string;
  subject: string;
  description?: string;
  important: boolean;
}

export type TodoBody = Omit<Todo, 'id'>;
