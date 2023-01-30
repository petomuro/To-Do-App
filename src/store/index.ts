import { defineStore } from "pinia";
import { Board, Data, List } from "../mixins/types";

export default defineStore("boards", {
  state: (): Data => {
    return {
      boards: [],
      lists: [],
    };
  },
  getters: {
    getBoards: () => localStorage.getItem("boards"),
    getLists: () => localStorage.getItem("lists"),
  },
  actions: {
    setBoards: (boards: Board[]) =>
      localStorage.setItem("boards", JSON.stringify(boards)),
    setLists: (lists: List[]) =>
      localStorage.setItem("boards", JSON.stringify(lists)),
  },
});
