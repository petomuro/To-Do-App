import { Board, List, Todo } from "./types";

export function localizeDate(date: string | Date): string {
  if (date !== "") {
    if (typeof date === "string") {
      return new Date(date).toLocaleString("sk-SK");
    } else {
      return date.toLocaleString("sk-SK");
    }
  } else {
    return "";
  }
}

export function findBoardIndexById(
  boardsData: Board[],
  boardId: number
): number {
  return boardsData.findIndex(
    (board) => parseInt(String(board.id)) === parseInt(String(boardId))
  );
}

export function findListIndexById(listsData: List[], listId: number): number {
  return listsData.findIndex(
    (list) => parseInt(String(list.id)) === parseInt(String(listId))
  );
}

export function findTodoIndexById(todosData: Todo[], todoId: number): number {
  return todosData.findIndex(
    (todo) => parseInt(String(todo.id)) === parseInt(String(todoId))
  );
}
