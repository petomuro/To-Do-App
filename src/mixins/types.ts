export interface Todo {
  id: number;
  title: string;
  content: string;
  deadline: string;
  is_adding_todo: boolean;
  is_editing_todo: boolean;
  is_done_todo: boolean;
}

export interface List {
  id: number;
  boardId: number;
  name: string;
  is_adding_list: boolean;
  is_editing_list: boolean;
  todos: Todo[];
}

export interface Board {
  id: number;
  title: string;
  is_adding_board: boolean;
  is_editing_board: boolean;
}
