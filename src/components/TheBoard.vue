<script lang="ts" setup>
import TheLists from "./TheLists.vue";
import {Board, Data} from "../mixins/types";
import useStore from "../store";
import {Ref, ref} from "vue";
import {useRoute} from "vue-router";

// Router
const route = useRoute();
const id = parseInt(route.params.id as string);

// Data and local storage
const boardsData: Ref<Board> = ref({} as Board);
const newBoardsData: Ref<Board> = ref({} as Board);
const store = useStore();

// Store data to localstorage function
const storeData = (data: Data) => {
  store.setBoards(data);
};

// Sample data fetch function
const fetchSampleData = () => {
  (async () => {
    try {
      const sampleData = await fetch("/sample-data.json");
      const data = await sampleData.json() as Data;
      boardsData.value = data.boards[id];
      storeData(data);
    } catch (error) {
      console.error(error);
    }
  })();
};

// Store data to localstorage function
const storeBoardData = () => {
  if (store.getBoards) {
    const data = JSON.parse(store.getBoards) as Data;
    data.boards[id] = boardsData.value;
    storeData(data);
  }
};

// Load board data from external json or local storage function
const loadBoardData = () => {
  if (store.getBoards) {
    const data = JSON.parse(store.getBoards) as Data;
    boardsData.value = data.boards[id];
  } else {
    fetchSampleData();
  }
};

// Load board data from local storage
loadBoardData();

// Data filtering
const listInputFilter = ref("");

const filterLists = () => {
  if (listInputFilter.value === "") {
    newBoardsData.value = {} as Board;
  } else {
    newBoardsData.value.lists = boardsData.value.lists.filter(list => list.name.includes(listInputFilter.value));
  }
};

// CRUD for lists
const deleteList = (listIndex: number) => {
  boardsData.value.lists.splice(listIndex, 1);
  storeBoardData();
};

const createList = () => {
  boardsData.value.lists.push({
    name: "",
    is_adding_list: true,
    is_editing_list: false,
    todos: []
  });
  const lastListIndex = boardsData.value.lists.length - 1;
  isEditingList({listIndex: lastListIndex, is_editing_list: true});
};

const isEditingList = (e: any) => {
  boardsData.value.lists[e.listIndex].is_editing_list = e.is_editing_list;
};

const updateList = (e: any) => {
  boardsData.value.lists[e.listIndex] = e.newList;
  boardsData.value.lists[e.listIndex].is_adding_list = false;
  boardsData.value.lists[e.listIndex].is_editing_list = false;
  storeBoardData();
};

// CRUD for todos
const deleteTodo = (e: any) => {
  boardsData.value.lists[e.listIndex].todos.splice(e.todoIndex, 1);
  storeBoardData();
};

const createTodo = (listIndex: number) => {
  boardsData.value.lists[listIndex].todos.push({
    title: "",
    content: "",
    deadline: "",
    is_adding_todo: true,
    is_editing_todo: false,
    is_done_todo: false,
  });
  const lastTodoIndex = boardsData.value.lists[listIndex].todos.length - 1;
  isEditingTodo({listIndex: listIndex, todoIndex: lastTodoIndex, is_editing_todo: true});
};

const isEditingTodo = (e: any) => {
  boardsData.value.lists[e.listIndex].todos[e.todoIndex].is_editing_todo = e.is_editing_todo;
};

const updateTodo = (e: any) => {
  boardsData.value.lists[e.listIndex].todos[e.todoIndex] = e.newTodo;
  boardsData.value.lists[e.listIndex].todos[e.todoIndex].is_adding_todo = false;
  boardsData.value.lists[e.listIndex].todos[e.todoIndex].is_editing_todo = false;
  storeBoardData();
};

const toggleDoneTodo = (e: any) => {
  boardsData.value.lists[e.listIndex].todos[e.todoIndex].is_done_todo = e.is_done_todo;
  storeBoardData();
};
</script>

<template>
  <div v-if="boardsData?.lists !== undefined" class="flex flex-column">
    <div class="flex justify-content-between align-items-center">
      <div class="p-3">
        <h1>{{ boardsData?.title }}</h1>
      </div>
      <div class="p-3">
        <InputText v-model="listInputFilter" placeholder="Search lists" type="text" @input="filterLists()"/>
      </div>
    </div>
    <div class="flex">
      <TheLists
          :lists-data="newBoardsData?.lists ? newBoardsData?.lists : boardsData?.lists"
          @delete-list="deleteList($event)"
          @create-list="createList()" @is-editing-list="isEditingList($event)" @update-list="updateList($event)"
          @delete-todo="deleteTodo($event)" @create-todo="createTodo($event)" @is-editing-todo="isEditingTodo($event)"
          @update-todo="updateTodo($event)" @done-todo="toggleDoneTodo($event)"/>
    </div>
  </div>
</template>

<style scoped>

</style>