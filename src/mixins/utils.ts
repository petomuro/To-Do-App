import { Board, List, Todo } from "./types";
import { customRef, Ref } from "vue";

export const localizeDate = (date: string | Date): string => {
  if (date !== "") {
    if (typeof date === "string") {
      return new Date(date).toLocaleString("sk-SK");
    } else {
      return date.toLocaleString("sk-SK");
    }
  } else {
    return "";
  }
};

export const findBoardIndexById = (
  boardsData: Board[],
  boardId: number
): number => {
  return boardsData.findIndex(
    (board) => parseInt(String(board.id)) === parseInt(String(boardId))
  );
};

export const findListIndexById = (
  listsData: List[],
  listId: number
): number => {
  return listsData.findIndex(
    (list) => parseInt(String(list.id)) === parseInt(String(listId))
  );
};

export const findTodoIndexById = (
  todosData: Todo[],
  todoId: number
): number => {
  return todosData.findIndex(
    (todo) => parseInt(String(todo.id)) === parseInt(String(todoId))
  );
};

export const boardsLocalStorage = (): Ref<Board[]> => {
  return customRef((track, trigger) => ({
    get: () => {
      track();

      return JSON.parse(localStorage.getItem("boards") ?? "[]");
    },
    set: (boards: Board[]) => {
      localStorage.setItem("boards", JSON.stringify(boards));
      trigger();
    },
  }));
};

export const listsLocalStorage = (boardId: number): Ref<List[]> => {
  return customRef((track, trigger) => ({
    get: () => {
      track();

      return JSON.parse(localStorage.getItem(`${boardId}lists`) ?? "[]");
    },
    set: (lists: List[]) => {
      localStorage.setItem(`${boardId}lists`, JSON.stringify(lists));
      trigger();
    },
  }));
};

export const convert2DTo1D = (data: any[][]): any[] => {
  let newData: any[] = [];
  for (let i = 0; i < data.length; i++) {
    newData = newData.concat(data[i]);
  }

  return newData;
};

export const getLastIndex = (data: any[]): number => {
  return data.length - 1;
};
