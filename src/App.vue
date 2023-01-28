<script lang="ts" setup>
import TheLists from "./components/TheLists.vue";
import {ref} from "vue";
import useStore from "./store/index";

const data = ref();
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

// CRUD for lists
const deleteList = (e: any) => {
  data.value.lists.splice(e, 1);
};

// CRUD for todos
const deleteTodo = (e: any) => {
  data.value.lists[e.listIndex].todos.splice(e.todoIndex, 1);
};

const toggleDoneTodo = (e: any) => {
  data.value.lists[e.listIndex].todos[e.todoIndex].is_done_todo = e.is_done_todo;
};

// Load sample data from external json or local storage
if (store.getBoards) {
  data.value = JSON.parse(store.getBoards);
} else {
  fetchSampleData();
}
</script>

<template>
  <div class="p-3">
    <h1>{{ data?.title }}</h1>
  </div>
  <div class="flex">
    <TheLists
        :lists-data="data?.lists" @delete-list="deleteList($event)"
        @delete-todo="deleteTodo($event)" @done-todo="toggleDoneTodo($event)"/>
  </div>
</template>

<style scoped>

</style>
