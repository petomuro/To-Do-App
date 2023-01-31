<script lang="ts" setup>
import TheTodos from "./TheTodos.vue";
import {findListIndexById} from "../mixins/utils";
import {List} from "../mixins/types";
import {reactive, ref, watch} from "vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

// Properties declaration
const props = defineProps<{
  listsData: List[]
  filtering: boolean,
}>();

// Emits declaration
const emit = defineEmits(["deleteList", "createList", "closeEditingNewList", "isEditingList", "updateList", "deleteTodo", "createTodo", "closeEditingNewTodo", "isEditingTodo", "updateTodo", "doneTodo"]);

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
let v$ = useVuelidate(rules, state);
const handleSubmit = async () => {
  return await v$.value.$validate();
};

// Emits for lists
const listInputs = ref(props.listsData);

const deleteList = (listId: number) => {
  emit("deleteList", listId);
};

const createList = () => {
  emit("createList");
};

const closeEditingNewList = () => {
  emit("closeEditingNewList");
};

const isEditingList = (listId: number) => {
  const listIndex = findListIndexById(props.listsData, listId);

  if (props.listsData[props.listsData.length - 1].is_adding_list) {
    closeEditingNewList();
  } else {
    emit("isEditingList", {
      listIndex: listIndex,
      is_editing_list: !props.listsData[listIndex].is_editing_list
    });
  }
};

const updateList = async (listId: number) => {
  let listIndex = findListIndexById(props.listsData, listId);

  if (!props.listsData[listIndex].is_editing_list) {
    listIndex = listId - 1;
  }

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

const closeEditingNewTodo = (listIndex: number) => {
  emit("closeEditingNewTodo", listIndex);
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

watch(() => props.listsData, () => {
  listInputs.value = props.listsData;
  state.collection = props.listsData;
  v$ = useVuelidate(rules, state);
});
</script>

<template>
  <div
      v-for="(list, listIndex) in listsData" :key="list.id"
      :class="{
        errorName: v$.collection.$each.$response.$errors[listIndex].name.length,
      }"
      class="flex flex-column bg-gray-200 border-round-xl m-3 w-30rem">
    <div class="flex justify-content-between">
      <div v-if="list?.is_editing_list" class="flex flex-column p-3">
        <label
            :class="{'p-error':v$.collection.$each.$response.$errors[listIndex].name.length}"
            class="text-primary" for="name">Name*</label>
        <InputText v-model="listInputs[listIndex].name" placeholder="Add name for list" type="text"/>
        <div v-for="error in v$.collection.$each.$response.$errors[listIndex].name" :key="error" class="p-error">
          {{ error.$message.replace('Value', 'Title') }}
        </div>
      </div>
      <div v-else class="flex flex-column p-3">
        <span class="text-primary">Name</span>
        <h2 class="cursor-pointer text-black-alpha-90" @click="isEditingList(list?.id)">{{ list?.name }}</h2>
      </div>
      <div v-if="list?.is_editing_list" class="flex align-items-center px-3">
        <i class="pi pi-check mx-3 cursor-pointer text-primary" @click="updateList(list?.id)"></i>
        <i class="pi pi-times cursor-pointer text-red-800" @click="isEditingList(list?.id)"></i>
      </div>
      <div v-else class="flex align-items-center px-3">
        <i class="pi pi-pencil mx-3 cursor-pointer text-blue-800" @click="isEditingList(list?.id)"></i>
        <i class="pi pi-trash cursor-pointer text-red-800" @click="deleteList(list?.id)"></i>
      </div>
    </div>
    <TheTodos
        :filtering="filtering" :list-id="parseInt(list?.id.toString())" :lists-data="listsData"
        :todos-data="list?.todos" @delete-todo="deleteTodo($event)" @create-todo="createTodo($event)"
        @close-editing-new-todo="closeEditingNewTodo($event)" @is-editing-todo="isEditingTodo($event)"
        @update-todo="updateTodo($event)" @done-todo="toggleDoneTodo($event)"/>
  </div>
  <div v-if="!filtering" class="flex flex-column">
    <TheButton class="m-3" label="+ Add new list" @click="createList()"/>
  </div>
</template>

<style scoped>

</style>