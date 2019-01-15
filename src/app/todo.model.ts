export interface Todo {
  id?: string;
  message: string;
  done: boolean;
}

export type TodoFilter = 'ALL' | 'DONE' | 'ACTIVE';
