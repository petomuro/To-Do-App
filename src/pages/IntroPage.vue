<script lang="ts" setup>
import TheBoards from "../components/TheBoards.vue";
import {Data} from "../mixins/types";
import useStore from "../store";
import {ref, Ref} from "vue";

// Sample data and local storage
const data: Ref<Data> = ref({} as Data);
const store = useStore();

// Store data to localstorage function
const storeData = () => {
  store.setBoards(data.value);
};

// Sample data fetch function
const fetchSampleData = () => {
  (async () => {
    try {
      const sampleData = await fetch("/sample-data.json");
      data.value = await sampleData.json() as Data;
      storeData();
    } catch (error) {
      console.error(error);
    }
  })();
};

// Load data from external json or local storage function
const loadData = () => {
  if (store.getBoards) {
    data.value = JSON.parse(store.getBoards) as Data;
  } else {
    fetchSampleData();
  }
};

// Load data from external json or local storage
loadData();

// CRUD for boards
const deleteBoard = (boardIndex: number) => {
  data.value.boards.splice(boardIndex, 1);
  storeData();
};

const createBoard = () => {
  data.value.boards.push({
    title: "",
    is_adding_board: true,
    is_editing_board: false,
    lists: []
  });
  const lastBoardIndex = data.value.boards.length - 1;
  isEditingBoard({boardIndex: lastBoardIndex, is_editing_board: true});
};

const isEditingBoard = (e: any) => {
  data.value.boards[e.boardIndex].is_editing_board = e.is_editing_board;
};

const updateBoard = (e: any) => {
  data.value.boards[e.boardIndex] = e.newBoard;
  data.value.boards[e.boardIndex].is_adding_board = false;
  data.value.boards[e.boardIndex].is_editing_board = false;
  storeData();
};
</script>

<template>
  <div v-if="data?.boards !== undefined" class="flex">
    <TheBoards
        :boards-data="data?.boards" @delete-board="deleteBoard($event)" @create-board="createBoard()"
        @is-editing-board="isEditingBoard($event)" @update-board="updateBoard($event)"/>
  </div>
</template>

<style scoped>

</style>