<script lang="ts" setup>
import TheTodos from "./TheTodos.vue";

// Properties declaration
const props = defineProps<{
  listsData: any
}>();
// Emits declaration
const emit = defineEmits(["deleteList", "deleteTodo", "doneTodo"]);

// Emits for lists
const deleteList = (e: any) => {
  emit("deleteList", e);
};

const createList = (e: any) => {
  // props.listsData.push({
  //   "name": "Next Week's sprint",
  //   "is_editing_list": false,
  //   "is_adding_todo": false,
  //   "todos": [
  //     {
  //       "title": "Add more functionalities to app",
  //       "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //       "deadline": "1.2.2023",
  //       "is_editing_list": false
  //     }
  //   ]
  // });
};

const updateList = (listIndex: number) => {
  // props.listsData[listIndex].name = "New title";
};

// Emits for todos
const deleteTodo = (e: any) => {
  emit("deleteTodo", e);
};

const createTodo = (e: any) => {

};

const updateTodo = (e: any) => {

};

const toggleDoneTodo = (e: any) => {
  emit("doneTodo", e);
};
</script>

<template>
  <div
      v-for="(list, listIndex) in props.listsData" :key="list"
      class="flex flex-column bg-white-alpha-20 m-3">
    <div class="flex justify-content-between">
      <div class="p-3">
        <h2>{{ list?.name }}</h2>
      </div>
      <div class="flex align-items-center p-3">
        <i class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue" @click="updateList(listIndex)"></i>
        <i class="pi pi-trash cursor-pointer" style="color: darkred" @click="deleteList(listIndex)"></i>
      </div>
    </div>
    <TheTodos
        :list-index="listIndex" :todos-data="list?.todos" @delete-todo="deleteTodo($event)"
        @done-todo="toggleDoneTodo($event)"/>
  </div>
  <div class="flex flex-column">
    <TheButton class="m-3" label="+ Add new list" @click="createList()"/>
  </div>
</template>

<style scoped>

</style>