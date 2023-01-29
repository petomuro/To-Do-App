import { defineStore } from "pinia";
import { Data, State } from "../mixins/types";

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
    setBoards: (data: Data) =>
      localStorage.setItem("boards", JSON.stringify(data)),
  },
});
