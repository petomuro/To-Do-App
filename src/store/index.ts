import { defineStore } from "pinia";
import { Board, List } from "../mixins/types";

export default defineStore("boards", {
  state: () => {
    return {
      boardId: -1,
    };
  },
  getters: {
    getBoards: () => localStorage.getItem("boards"),
    getLists: (state) => localStorage.getItem(`${state.boardId}lists`),
  },
  actions: {
    setBoards: (boards: Board[]) =>
      localStorage.setItem("boards", JSON.stringify(boards)),
    setLists: (boardId: number, lists: List[]) =>
      localStorage.setItem(`${boardId}lists`, JSON.stringify(lists)),
  },
});
