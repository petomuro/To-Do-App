<script lang="ts" setup>
import TheTodos from "./TheTodos.vue";
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

// Emits for lists
const deleteList = (listIndex: number) => {
  emit("deleteList", listIndex);
};

const createList = () => {
  emit("createList");
};

const isEditingList = (listIndex: number) => {
  emit("isEditingList", {
    listIndex: listIndex,
    is_editing_list: !props.listsData[listIndex].is_editing_list
  });
};

const listInputs = ref(props.listsData);

const updateList = (listIndex: number) => {
  emit("updateList", {
    listIndex: listIndex,
    newList: listInputs.value[listIndex]
  });
};

// Emits for todos
const deleteTodo = (e: any) => {
  emit("deleteTodo", e);
};

const createTodo = (listIndex: number) => {
  emit("createTodo", listIndex);
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
const handleSubmit = async (listIndex: number) => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  updateList(listIndex);
};
</script>

<template>
  <div
      v-for="(list, listIndex) in listsData" :key="list"
      :class="{
        errorName: v$.collection.$each.$response.$errors[listIndex].name.length,
      }"
      class="flex flex-column bg-white-alpha-20 border-round-xl m-3">
    <div class="flex justify-content-between">
      <div v-if="listsData[listIndex].is_editing_list" class="p-3">
        <label
            :class="{'p-error':v$.collection.$each.$response.$errors[listIndex].name.length}"
            for="name">Name*</label>
        <InputText v-model="listInputs[listIndex].name" placeholder="Add name for list" type="text"/>
        <div v-for="error in v$.collection.$each.$response.$errors[listIndex].name" :key="error" class="p-error">
          {{ error.$message.replace('Value', 'Title') }}
        </div>
      </div>
      <div v-else class="p-3">
        <h2>{{ list?.name }}</h2>
      </div>
      <div v-if="listsData[listIndex].is_editing_list" class="flex align-items-center p-3">
        <i class="pi pi-check mx-3 cursor-pointer" style="color: darkgreen" @click="handleSubmit(listIndex)"></i>
        <i class="pi pi-times cursor-pointer" style="color: darkred" @click="deleteList(listIndex)"></i>
      </div>
      <div v-else class="flex align-items-center p-3">
        <i class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue" @click="isEditingList(listIndex)"></i>
        <i class="pi pi-trash cursor-pointer" style="color: darkred" @click="deleteList(listIndex)"></i>
      </div>
    </div>
    <TheTodos
        :list-index="listIndex" :todos-data="list?.todos" @delete-todo="deleteTodo($event)"
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