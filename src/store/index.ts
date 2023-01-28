import { defineStore } from "pinia";
import { Board, State } from "../mixins/types";

export default defineStore("boards", {
  state: (): State => {
    return {
      boards: "",
    };
  },
  getters: {
    getBoards: () => localStorage.getItem("boards"),
  },
  actions: {
    setBoards: (data: Board) =>
      localStorage.setItem("boards", JSON.stringify(data)),
  },
});
