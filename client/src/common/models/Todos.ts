export interface Todo {
  id: string;
  title: string;
  subject: string;
  description?: string;
  important: boolean;
  userId: string;
}

export type TodoBody = Omit<Todo, 'id' | 'userId'>;
