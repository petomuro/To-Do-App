export interface State {
  boards: string;
}

export interface Todo {
  title: string;
  content: string;
  deadline: string;
  is_editing_todo: boolean;
  is_done_todo: boolean;
}

export interface List {
  name: string;
  is_editing_list: boolean;
  todos: Todo[];
}

export interface Board {
  title: string;
  lists: List[];
}
