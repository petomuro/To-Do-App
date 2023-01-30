<script lang="ts" setup>
import TheTodos from "./TheTodos.vue";
import {findListIndexById} from "../mixins/utils";
import {List} from "../mixins/types";
import {reactive, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

// Properties declaration
const props = defineProps<{
  listsData: List[]
}>();
// Emits declaration
const emit = defineEmits(["deleteList", "createList", "isEditingList", "updateList", "deleteTodo", "createTodo", "isEditingTodo", "updateTodo", "doneTodo"]);

// Validations
const rules = {
  collection: {
    $each: helpers.forEach({
      name: {
        required
      },
    })
  }
};
const state = reactive({
  collection: props.listsData
});
const v$ = useVuelidate(rules, state);
const handleSubmit = async () => {
  return await v$.value.$validate();
};

// Emits for lists
const deleteList = (listId: number) => {
  emit("deleteList", listId);
};

const createList = () => {
  emit("createList");
};

const isEditingList = (listId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);

  if (props.listsData[listIndex].is_adding_list) {
    deleteList(listId);
  } else {
    emit("isEditingList", {
      listIndex: listIndex,
      is_editing_list: !props.listsData[listIndex].is_editing_list
    });
  }
};

const listInputs = ref(props.listsData);

const updateList = async (listId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);

  if (await handleSubmit()) {
    emit("updateList", {
      listIndex: listIndex,
      listId: listId,
      newList: listInputs.value[listIndex]
    });
  }
};

// Emits for todos
const deleteTodo = (e: any) => {
  emit("deleteTodo", e);
};

const createTodo = (listId: number) => {
  emit("createTodo", listId);
};

const isEditingTodo = (e: any) => {
  emit("isEditingTodo", e);
};

const updateTodo = (e: any) => {
  emit("updateTodo", e);
};

const toggleDoneTodo = (e: any) => {
  emit("doneTodo", e);
};
</script>

<template>
  <div
      v-for="(list, listIndex) in listsData" :key="listIndex"
      :class="{
        errorName: v$.collection.$each.$response.$errors[listIndex].name.length,
      }"
      class="flex flex-column flex-grow-1 bg-white-alpha-20 border-round-xl m-3">
    <div class="flex justify-content-between">
      <div v-if="list?.is_editing_list" class="flex flex-column p-3">
        <label
            :class="{'p-error':v$.collection.$each.$response.$errors[listIndex].name.length}"
            for="name">Name*</label>
        <InputText v-model="listInputs[listIndex].name" placeholder="Add name for list" type="text"/>
        <div v-for="error in v$.collection.$each.$response.$errors[listIndex].name" :key="error" class="p-error">
          {{ error.$message.replace('Value', 'Title') }}
        </div>
      </div>
      <div v-else class="flex flex-column p-3">
        <span class="text-primary">Name</span>
        <h2 class="cursor-pointer" @click="isEditingList(list?.id)">{{ list?.name }}</h2>
      </div>
      <div v-if="list?.is_editing_list" class="flex align-items-center px-3">
        <i class="pi pi-check mx-3 cursor-pointe text-primary" @click="updateList(list?.id)"></i>
        <i class="pi pi-times cursor-pointer" style="color: darkred" @click="isEditingList(list?.id)"></i>
      </div>
      <div v-else class="flex align-items-center px-3">
        <i class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue" @click="isEditingList(list?.id)"></i>
        <i class="pi pi-trash cursor-pointer" style="color: darkred" @click="deleteList(list?.id)"></i>
      </div>
    </div>
    <TheTodos
        :list-id="parseInt(list?.id.toString())" :lists-data="listsData" :todos-data="list?.todos"
        @delete-todo="deleteTodo($event)"
        @create-todo="createTodo($event)"
        @is-editing-todo="isEditingTodo($event)"
        @update-todo="updateTodo($event)"
        @done-todo="toggleDoneTodo($event)"/>
  </div>
  <div class="flex flex-column">
    <TheButton class="m-3" label="+ Add new list" @click="createList()"/>
  </div>
</template>

<style scoped>

</style>