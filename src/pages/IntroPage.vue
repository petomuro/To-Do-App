<script lang="ts" setup>
import TheBoards from "../components/TheBoards.vue";
import useStore from "../store";
import {findBoardIndexById} from "../mixins/utils";
import {Board} from "../mixins/types";
import {ref, Ref} from "vue";

const data: Ref<Board[]> = ref([] as Board[]);
const store = useStore();

// Local storage
const storeData = () => {
  store.setBoards(data.value);
};

// MockApi data fetch function
const fetchMockApiData = async () => {
  try {
    const mockApiData = await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards");
    data.value = await mockApiData.json() as Board[];
    store.setBoards(data.value);
  } catch (error) {
    console.error(error);
  }
};

// Load data from mockApi or local storage function
const fetchData = async () => {
  if (store.getBoards) {
    data.value = JSON.parse(store.getBoards) as Board[];
  } else {
    await fetchMockApiData();
  }
};

// Load data from mockApi or local storage
await fetchData();

// CRUD for boards
const deleteBoardFromMockApi = async (boardId: number) => {
  await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${boardId}`, {
    method: "DELETE"
  });
};

const deleteBoard = async (boardId: number) => {
  const boardIndex = findBoardIndexById(data.value, boardId);
  data.value.splice(boardIndex, 1);
  await deleteBoardFromMockApi(boardId);
  storeData();
};

const createBoard = async () => {
  data.value.push({
    id: data.value.length + 1,
    title: "",
    is_adding_board: true,
    is_editing_board: false,
  });
  const lastBoardIndex = data.value.length - 1;
  await isEditingBoard({boardIndex: lastBoardIndex, is_editing_board: true});
};

const isEditingBoard = async (e: any) => {
  data.value[e.boardIndex].is_editing_board = e.is_editing_board;

  if (!e.is_editing_board) {
    await fetchData();
  }
};

const createBoardInMockApi = async (e: any) => {
  await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: data.value[e.boardIndex].title
    })
  });
};

const updateBoardToMockApi = async (e: any) => {
  await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e.boardId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data.value[e.boardIndex])
  });
};

const updateBoard = async (e: any) => {
  data.value[e.boardIndex] = e.newBoard;
  data.value[e.boardIndex].is_editing_board = false;

  if (data.value[e.boardIndex].is_adding_board) {
    data.value[e.boardIndex].is_adding_board = false;
    await createBoardInMockApi(e);
  } else {
    await updateBoardToMockApi(e);
  }

  storeData();
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