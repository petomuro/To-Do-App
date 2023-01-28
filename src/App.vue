<script lang="ts" setup>
import TheLists from "./components/TheLists.vue";
import {ref, Ref} from "vue";
import useStore from "./store/index";
import {Board} from "./mixins/types";

const menuItems = ref([
  {
    label: "Board1"
  }
]);

const data: Ref<Board> = ref({} as Board);
const newData: Ref<Board> = ref({} as Board);
const store = useStore();

const storeBoardData = () => {
  store.setBoards(data.value);
};

// Sample data fetch function
const fetchSampleData = () => {
  (async () => {
    try {
      const sampleData = await fetch("/sample-data.json");
      data.value = await sampleData.json();
      storeBoardData();
    } catch (error) {
      console.error(error);
    }
  })();
};

// Load data from external json or local storage
if (store.getBoards) {
  data.value = JSON.parse(store.getBoards);
} else {
  fetchSampleData();
}

// Data filtering
const listInputFilter = ref("");

const filterLists = () => {
  if (listInputFilter.value === "") {
    newData.value = {} as Board;
  } else {
    newData.value.lists = data.value.lists.filter(list => list.name.includes(listInputFilter.value));
  }
};

// CRUD for lists
const deleteList = (listIndex: number) => {
  data.value.lists.splice(listIndex, 1);
  storeBoardData();
};

const createList = () => {
  data.value.lists.push({
    name: "",
    is_editing_list: false,
    todos: []
  });
  const lastListIndex = data.value.lists.length - 1;
  data.value.lists[lastListIndex].is_editing_list = true;
};

const isEditingList = (e: any) => {
  data.value.lists[e.listIndex].is_editing_list = e.is_editing_list;
};

const updateList = (e: any) => {
  data.value.lists[e.listIndex] = e.newList;
  data.value.lists[e.listIndex].is_editing_list = false;
  storeBoardData();
};

// CRUD for todos
const deleteTodo = (e: any) => {
  data.value.lists[e.listIndex].todos.splice(e.todoIndex, 1);
  storeBoardData();
};

const createTodo = (listIndex: number) => {
  data.value.lists[listIndex].todos.push({
    title: "",
    content: "",
    deadline: "",
    is_editing_todo: false,
    is_done_todo: false,
  });
  const lastTodoIndex = data.value.lists[listIndex].todos.length - 1;
  data.value.lists[listIndex].todos[lastTodoIndex].is_editing_todo = true;
};

const isEditingTodo = (e: any) => {
  data.value.lists[e.listIndex].todos[e.todoIndex].is_editing_todo = e.is_editing_todo;
};

const updateTodo = (e: any) => {
  data.value.lists[e.listIndex].todos[e.todoIndex] = e.newTodo;
  data.value.lists[e.listIndex].todos[e.todoIndex].is_editing_todo = false;
  storeBoardData();
};

const toggleDoneTodo = (e: any) => {
  data.value.lists[e.listIndex].todos[e.todoIndex].is_done_todo = e.is_done_todo;
  storeBoardData();
};
</script>

<template>
  <TheMenubar :model="menuItems"/>
  <div class="flex justify-content-between align-items-center">
    <div class="p-3">
      <h1>{{ data?.title }}</h1>
    </div>
    <div class="p-3">
      <InputText v-model="listInputFilter" placeholder="Search lists" type="text" @input="filterLists()"/>
    </div>
  </div>
  <div class="flex">
    <TheLists
        :lists-data="newData?.lists ? newData?.lists : data?.lists" @delete-list="deleteList($event)"
        @create-list="createList()" @is-editing-list="isEditingList($event)" @update-list="updateList($event)"
        @delete-todo="deleteTodo($event)" @create-todo="createTodo($event)" @is-editing-todo="isEditingTodo($event)"
        @update-todo="updateTodo($event)" @done-todo="toggleDoneTodo($event)"/>
  </div>
</template>

<style scoped>

</style>
