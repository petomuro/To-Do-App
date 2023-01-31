import { defineStore } from "pinia";
import { Board, List } from "../mixins/types";

export default defineStore("boards", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    setBoards: (boards: Board[]) =>
      localStorage.setItem("boards", JSON.stringify(boards)),
    setLists: (boardId: number, lists: List[]) =>
      localStorage.setItem(`${boardId}lists`, JSON.stringify(lists)),
  },
});
