<script lang="ts" setup>

// Properties declaration
const props = defineProps<{
  listIndex: number,
  todosData: any
}>();
// Emits declaration
const emit = defineEmits(["deleteTodo", "doneTodo"]);

// Emits for todos
const deleteTodo = (listIndex: number, todoIndex: number) => {
  emit("deleteTodo", {listIndex: listIndex, todoIndex: todoIndex});
};

const createTodo = (listIndex: number) => {
  // props.todosData.push({
  //   "title": "Add more functionalities to app",
  //   "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   "deadline": "1.2.2023",
  //   "is_editing_list": false
  // });
};

const updateTodo = (listIndex: number, todoIndex: number) => {
  // props.todosData[todoIndex].content = "New title";
};

const toggleDoneTodo = (listIndex: number, todoIndex: number) => {
  emit("doneTodo", {
    listIndex: listIndex,
    todoIndex: todoIndex,
    is_done_todo: !props.todosData[todoIndex].is_done_todo
  });
};
</script>

<template>
  <div v-for="(todo, todoIndex) in todosData" :key="todo" class="flex flex-column bg-white-alpha-30 m-3">
    <div class="p-3">
      <h3>{{ todo?.title }}</h3>
      <p>{{ todo?.content }}</p>
      <p>{{ todo?.deadline }}</p>
    </div>
    <div class="flex align-items-center p-3">
      <i
          v-if="!todo?.is_done_todo" class="pi pi-check cursor-pointer" style="color: darkgreen"
          @click="toggleDoneTodo(listIndex, todoIndex)"></i>
      <i
          v-else class="pi pi-times cursor-pointer" style="color: darkred"
          @click="toggleDoneTodo(listIndex, todoIndex)"></i>
      <i
          class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue"
          @click="updateTodo(listIndex, todoIndex)"></i>
      <i
          class="pi pi-trash red cursor-pointer" style="color: darkred"
          @click="deleteTodo(listIndex, todoIndex)"></i>
    </div>
  </div>
  <div class="flex">
    <TheButton class="m-3" label="+ Add new todo" @click="createTodo(listIndex)"/>
  </div>
</template>

<style scoped>

</style>