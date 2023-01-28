import { defineStore } from "pinia";

interface State {
  boards: string;
}

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
    setBoards: (data: any) =>
      localStorage.setItem("boards", JSON.stringify(data)),
  },
});
