<script lang="ts" setup>
import TheBoards from "../components/TheBoards.vue";
import {findBoardIndexById} from "../mixins/utils";
import {Board} from "../mixins/types";
import {ref, Ref} from "vue";

const data: Ref<Board[]> = ref([] as Board[]);

// MockApi data fetch function
const fetchMockApiData = async () => {
  try {
    const mockApiData = await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards");
    data.value = await mockApiData.json() as Board[];
    // const sampleData = await fetch("/sample-data.json");
    // const normalizedSampleData = await sampleData.json() as Data;
    // data.value = normalizedSampleData.boards;
  } catch (error) {
    console.error(error);
  }
};

// Load data from mockApi
await fetchMockApiData();

// CRUD for boards
const deleteBoard = (boardId: number) => {
  const boardIndex = findBoardIndexById(data.value, boardId);
  data.value.splice(boardIndex, 1);

  fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${boardId}`, {
    method: "DELETE"
  });
};

const createBoard = () => {
  data.value.push({
    id: data.value.length + 1,
    title: "",
    is_adding_board: true,
    is_editing_board: false,
  });
  const lastBoardIndex = data.value.length - 1;
  isEditingBoard({boardIndex: lastBoardIndex, is_editing_board: true});
};

const isEditingBoard = (e: any) => {
  data.value[e.boardIndex].is_editing_board = e.is_editing_board;
};

const updateBoard = (e: any) => {
  data.value[e.boardIndex] = e.newBoard;
  data.value[e.boardIndex].is_editing_board = false;

  if (data.value[e.boardIndex].is_adding_board) {
    data.value[e.boardIndex].is_adding_board = false;

    fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: data.value[e.boardIndex].title
      })
    });
  } else {
    fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e.boardId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data.value[e.boardIndex])
    });
  }
};
</script>

<template>
  <div class="flex">
    <TheBoards
        :boards-data="data" @delete-board="deleteBoard($event)" @create-board="createBoard()"
        @is-editing-board="isEditingBoard($event)" @update-board="updateBoard($event)"/>
  </div>
</template>

<style scoped>

</style>