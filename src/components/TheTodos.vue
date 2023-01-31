<script lang="ts" setup>
import {findListIndexById, findTodoIndexById, localizeDate} from "../mixins/utils";
import {List, Todo} from "../mixins/types";
import {reactive, ref, watch} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

// Properties declaration
const props = defineProps<{
  listId: number,
  listsData: List[],
  todosData: Todo[],
  filtering: boolean
}>();

// Emits declaration
const emit = defineEmits(["deleteTodo", "createTodo", "isEditingTodo", "updateTodo", "doneTodo"]);

// Validations
const rules = {
  collection: {
    $each: helpers.forEach({
      title: {
        required
      },
      deadline: {
        required
      }
    })
  }
};
const state = reactive({
  collection: props.todosData
});
let v$ = useVuelidate(rules, state);
const handleSubmit = async () => {
  return await v$.value.$validate();
};

// Emits for todos
const todoInputs = ref(props.todosData);

const deleteTodo = (listId: number, todoId: number) => {
  emit("deleteTodo", {listId: listId, todoId: todoId});
};

const createTodo = (listId: number) => {
  emit("createTodo", listId);
};

const isEditingTodo = (listId: number, todoId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);
  const todoIndex = findTodoIndexById(props.todosData, todoId);

  if (props.todosData[todoIndex].is_adding_todo) {
    deleteTodo(listId, todoId);
  } else {
    emit("isEditingTodo", {
      listIndex: listIndex,
      todoIndex: todoIndex,
      is_editing_todo: !props.todosData[todoIndex].is_editing_todo
    });
  }
};

const updateTodo = async (listId: number, todoId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);
  const todoIndex = findTodoIndexById(props.todosData, todoId);

  if (await handleSubmit()) {
    emit("updateTodo", {
      listIndex: listIndex,
      listId: listId,
      todoIndex: todoIndex,
      todoId: todoId,
      newTodo: todoInputs.value[todoIndex]
    });
  }
};

const toggleDoneTodo = (listId: number, todoId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);
  const todoIndex = findTodoIndexById(props.todosData, todoId);

  emit("doneTodo", {
    listIndex: listIndex,
    listId: listId,
    todoIndex: todoIndex,
    todoId: todoId,
    is_done_todo: !props.todosData[todoIndex].is_done_todo
  });
};

watch(() => props.todosData, () => {
  todoInputs.value = props.todosData;
  state.collection = props.todosData;
  v$ = useVuelidate(rules, state);
});
</script>

<template>
  <div
      v-for="(todo, todoIndex) in todosData" :key="todo.id"
      :class="{errorTitle: v$.collection.$each.$response.$errors[todoIndex].title.length,errorDeadline: v$.collection.$each.$response.$errors[todoIndex].deadline.length}"
      class="flex flex-column justify-content-between bg-gray-300 border-round-xl m-3">
    <div v-if="todo?.is_editing_todo" class="flex flex-column p-3">
      <label
          :class="{'p-error':v$.collection.$each.$response.$errors[todoIndex].title.length}"
          class="text-primary" for="title">Title*</label>
      <InputText
          id="title"
          v-model="todoInputs[todoIndex].title"
          :class="{'p-invalid':v$.collection.$each.$response.$errors[todoIndex].title.length}"
          placeholder="Add title for todo"
          type="text"/>
      <div v-for="error in v$.collection.$each.$response.$errors[todoIndex].title" :key="error" class="p-error">
        {{ error.$message.replace('Value', 'Title') }}
      </div>
      <div class="flex flex-column my-3">
        <label class="text-primary" for="content">Content</label>
        <TheTextarea
            id="content"
            v-model="todoInputs[todoIndex].content" :auto-resize="true" cols="30"
            placeholder="Add content for todo" rows="5"/>
      </div>
      <label
          :class="{'p-error':v$.collection.$each.$response.$errors[todoIndex].deadline.length}"
          class="text-primary" for="deadline">Deadline*</label>
      <TheCalendar
          id="deadline" v-model="todoInputs[todoIndex].deadline"
          :class="{'p-invalid':v$.collection.$each.$response.$errors[todoIndex].deadline.length}"
          date-format="dd.mm.yy"
          placeholder="Add deadline for todo" show-time
          @update:model-value="localizeDate(todoInputs[todoIndex].deadline)"/>
      <div v-for="error in v$.collection.$each.$response.$errors[todoIndex].deadline" :key="error" class="p-error">
        {{ error.$message.replace('Value', 'Deadline') }}
      </div>
    </div>
    <div v-else class="flex flex-column p-3 cursor-pointer" @click="isEditingTodo(listId, todo?.id)">
      <div class="flex flex-column">
        <span class="text-primary">Title</span>
        <h3 class="text-black-alpha-90">{{ todo?.title }}</h3>
      </div>
      <div class="flex flex-column my-3">
        <span class="text-primary">Content</span>
        <p class="text-black-alpha-90">{{ todo?.content }}</p>
      </div>
      <div class="flex flex-column">
        <span class="text-primary">Deadline</span>
        <p class="text-black-alpha-90">{{ localizeDate(todo?.deadline) }}</p>
      </div>
    </div>
    <div class="flex justify-content-between align-items-center">
      <div v-if="todo?.is_editing_todo" class="flex align-items-center p-3">
        <i class="pi pi-check cursor-pointer text-primary" @click="updateTodo(listId, todo?.id)"></i>
        <i class="pi pi-times cursor-pointer mx-3 text-red-800" @click="isEditingTodo(listId, todo?.id)"></i>
      </div>
      <div v-else class="flex align-items-center p-3">
        <i
            v-if="!todo?.is_done_todo" class="pi pi-check cursor-pointer text-primary"
            @click="toggleDoneTodo(listId, todo?.id)"></i>
        <i
            v-else class="pi pi-times cursor-pointer text-red-800"
            @click="toggleDoneTodo(listId, todo?.id)"></i>
        <i
            class="pi pi-pencil mx-3 cursor-pointer text-blue-800"
            @click="isEditingTodo(listId, todo?.id)"></i>
        <i class="pi pi-trash cursor-pointer text-red-800" @click="deleteTodo(listId, todo?.id)"></i>
      </div>
      <div v-if="todo?.is_done_todo" class="flex align-items-center p-3">
        <span class="border-2 border-round-xl p-2 bg-green-800 border-green-800">Done</span>
      </div>
      <div v-if="!todo?.is_adding_todo && !todo?.is_done_todo" class="flex align-items-center p-3">
        <span
            class="border-2 border-round-xl p-2 bg-orange-800 border-orange-800">In progress</span>
      </div>
    </div>
  </div>
  <div v-if="!filtering" class="flex">
    <TheButton class="m-3" label="+ Add new todo" @click="createTodo(listId)"/>
  </div>
</template>

<style scoped>

</style>