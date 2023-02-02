<script lang="ts" setup>
import TheBoards from "../components/TheBoards.vue";
import {boardsLocalStorage, findBoardIndexById, getLastIndex} from "../mixins/utils";
import {Board} from "../mixins/types";
import useStore from "../store";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import {ref, Ref} from "vue";

// Local storage
const store = useStore();

// Variables
const data: Ref<Board[]> = ref([] as Board[]);

// Confirm
const confirm = useConfirm();

// Toast
const toast = useToast();

// Local storage function
const storeData = () => {
  store.setBoards(data.value);
};

// MockApi data fetch functions
const fetchMockApiData = async () => {
  // Fetch data from mockApi
  const mockApiData = await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards");

  return await mockApiData.json() as Board[];
};

const fetchFromMockApi = async () => {
  // Try to fetch data from mockApi and store them to local storage
  try {
    data.value = await fetchMockApiData();
    storeData();
    // toast.add({severity: "success", summary: "Success Message", detail: "Data fetched successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

// Load data from mockApi or local storage function
const fetchData = async () => {
  // If new data was added to mockApi
  if ((await fetchMockApiData()).length !== boardsLocalStorage().value.length) {
    // Fetch them and store to local storage
    await fetchFromMockApi();
  } else {
    // Else get data from local storage
    data.value = boardsLocalStorage().value;
  }
};

// CRUD for boards functions
const deleteBoardFromMockApi = async (boardId: number) => {
  // Try delete data from mockApi
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${boardId}`, {
      method: "DELETE"
    });
    toast.add({severity: "success", summary: "Success Message", detail: "Board deleted successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const deleteBoard = (boardId: number) => {
  // Show confirmation dialog on data deletion
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // Find index of board
      const boardIndex = findBoardIndexById(data.value, boardId);
      // Delete board from reactive variable
      data.value.splice(boardIndex, 1);
      // Delete board from mockApi
      await deleteBoardFromMockApi(boardId);
      // Fetch new data from mockApi and store them to local storage
      await fetchFromMockApi();
    },
    reject: () => {
      // toast.add({severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000});
    }
  });
};

const createBoard = async () => {
  // Push new board to reactive variable
  data.value.push({
    id: data.value.length + 1,
    title: "",
    is_adding_board: true,
    is_editing_board: false,
  });
  // Get last index
  const lastBoardIndex = getLastIndex(data.value);
  // Start editing new board
  await isEditingBoard({boardIndex: lastBoardIndex, is_editing_board: true});
};

const closeEditingNewBoard = () => {
  // Pop new board from reactive variable
  data.value.pop();
};

const isEditingBoard = async (e: any) => {
  // Start/stop editing
  data.value[e.boardIndex].is_editing_board = e.is_editing_board;

  // If editing is false
  if (!e.is_editing_board) {
    // Fetch data from mockApi or local storage
    await fetchData();
  }
};

const createBoardInMockApi = async (e: any) => {
  // Try to create new board on mockApi
  try {
    await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: data.value[e.boardIndex].title
      })
    });
    toast.add({severity: "success", summary: "Success Message", detail: "Board created successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateBoardToMockApi = async (e: any) => {
  // Try to update board to mockApi
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e.boardId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data.value[e.boardIndex])
    });
    toast.add({severity: "success", summary: "Success Message", detail: "Board updated successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateBoard = async (e: any) => {
  // Store new board data to reactive variable
  data.value[e.boardIndex] = e.newBoard;
  // Stop editing
  data.value[e.boardIndex].is_editing_board = false;

  // If adding board is true
  if (data.value[e.boardIndex].is_adding_board) {
    // Clear is adding board
    data.value[e.boardIndex].is_adding_board = false;
    // Create new board on mockApi
    await createBoardInMockApi(e);
  } else {
    // Else update board to mockApi
    await updateBoardToMockApi(e);
  }

  // Fetch data from mockApi and store them to local storage
  await fetchFromMockApi();
};

// Load data from mockApi or local storage
await fetchData();
</script>

<template>
  <div class="flex flex-column align-items-center p-3 bg-cadet-blue">
    <div class="flex flex-column align-items-end">
      <h1 class="text-7xl">todo app</h1>
      <p class="-mt-3">BY PETER MURIN</p>
    </div>
    <div class="flex flex-column">
      <h2>Hey, What's up! What do you want to do today?</h2>
      <h2>Start adding items to your to-do list</h2>
    </div>
  </div>
  <div class="flex flex-wrap justify-content-center p-3 bg-flora-white">
    <TheBoards
        :boards-data="data" @delete-board="deleteBoard($event)" @create-board="createBoard()"
        @close-editing-new-board="closeEditingNewBoard()" @is-editing-board="isEditingBoard($event)"
        @update-board="updateBoard($event)"/>
  </div>
  <div class="flex justify-content-center p-3">
    <h1 class="text-black-alpha-90">KEEP YOUR DAYS ORGANISED WITH TODO APP</h1>
  </div>
</template>

<style scoped>

</style>