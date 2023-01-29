<script lang="ts" setup>
import {localizeDate} from "../mixins/utils";
import {Todo} from "../mixins/types";
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

// Properties declaration
const props = defineProps<{
  listIndex: number,
  todosData: Todo[]
}>();
// Emits declaration
const emit = defineEmits(["deleteTodo", "createTodo", "isEditingTodo", "updateTodo", "doneTodo"]);

// Emits for todos
const deleteTodo = (listIndex: number, todoIndex: number) => {
  emit("deleteTodo", {listIndex: listIndex, todoIndex: todoIndex});
};

const createTodo = (listIndex: number) => {
  emit("createTodo", listIndex);
};

const todoInputs = ref(props.todosData);

const isEditingTodo = (listIndex: number, todoIndex: number) => {
  if (props.todosData[todoIndex].is_adding_todo) {
    deleteTodo(listIndex, todoIndex);
  } else {
    emit("isEditingTodo", {
      listIndex: listIndex,
      todoIndex: todoIndex,
      is_editing_todo: !props.todosData[todoIndex].is_editing_todo
    });
  }
};

const updateTodo = (listIndex: number, todoIndex: number) => {
  emit("updateTodo", {
    listIndex: listIndex,
    todoIndex: todoIndex,
    newTodo: todoInputs.value[todoIndex]
  });
};

const toggleDoneTodo = (listIndex: number, todoIndex: number) => {
  emit("doneTodo", {
    listIndex: listIndex,
    todoIndex: todoIndex,
    is_done_todo: !props.todosData[todoIndex].is_done_todo
  });
};

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
const v$ = useVuelidate(rules, state);
const handleSubmit = async (listIndex: number, todoIndex: number) => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  updateTodo(listIndex, todoIndex);
};
</script>

<template>
  <div
      v-for="(todo, todoIndex) in todosData" :key="todo"
      :class="{errorTitle: v$.collection.$each.$response.$errors[todoIndex].title.length,errorDeadline: v$.collection.$each.$response.$errors[todoIndex].deadline.length}"
      class="flex flex-column bg-white-alpha-30 border-round-xl m-3">
    <div v-if="todosData[todoIndex].is_editing_todo" class="flex flex-column p-3">
      <label
          :class="{'p-error':v$.collection.$each.$response.$errors[todoIndex].title.length}"
          for="title">Title*</label>
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
        <label for="content">Content</label>
        <TheTextarea
            id="content"
            v-model="todoInputs[todoIndex].content" :auto-resize="true" cols="30"
            placeholder="Add content for todo" rows="5"/>
      </div>
      <label
          :class="{'p-error':v$.collection.$each.$response.$errors[todoIndex].deadline.length}"
          for="deadline">Deadline*</label>
      <TheCalendar
          id="deadline"
          v-model="todoInputs[todoIndex].deadline"
          :class="{'p-invalid':v$.collection.$each.$response.$errors[todoIndex].deadline.length}" date-format="dd.mm.yy"
          placeholder="Add deadline for todo"/>
      <div v-for="error in v$.collection.$each.$response.$errors[todoIndex].deadline" :key="error" class="p-error">
        {{ error.$message.replace('Value', 'Deadline') }}
      </div>
    </div>
    <div v-else class="flex flex-column p-3 cursor-pointer" @click="isEditingTodo(listIndex, todoIndex)">
      <h3>{{ todo?.title }}</h3>
      <p class="my-3">{{ todo?.content }}</p>
      <p>{{ localizeDate(todo?.deadline) }}</p>
    </div>
    <div class="flex justify-content-between align-items-center">
      <div v-if="todosData[todoIndex].is_editing_todo" class="flex align-items-center p-3">
        <i
            class="pi pi-check cursor-pointer" style="color: darkgreen"
            @click="handleSubmit(listIndex, todoIndex)"></i>
        <i
            class="pi pi-times cursor-pointer mx-3" style="color: darkred"
            @click="isEditingTodo(listIndex, todoIndex)"></i>
      </div>
      <div v-else class="flex align-items-center p-3">
        <i
            v-if="!todo?.is_done_todo" class="pi pi-check cursor-pointer" style="color: darkgreen"
            @click="toggleDoneTodo(listIndex, todoIndex)"></i>
        <i
            v-else class="pi pi-times cursor-pointer" style="color: darkred"
            @click="toggleDoneTodo(listIndex, todoIndex)"></i>
        <i
            class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue"
            @click="isEditingTodo(listIndex, todoIndex)"></i>
        <i
            class="pi pi-trash cursor-pointer" style="color: darkred"
            @click="deleteTodo(listIndex, todoIndex)"></i>
      </div>
      <div v-if="todosData[todoIndex].is_done_todo" class="p-3">
        <span class="border-2 border-round-xl p-2" style="border: seagreen; background: seagreen">Done</span>
      </div>
    </div>
  </div>
  <div class="flex">
    <TheButton class="m-3" label="+ Add new todo" @click="createTodo(listIndex)"/>
  </div>
</template>

<style scoped>

</style>