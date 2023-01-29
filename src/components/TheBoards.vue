<script lang="ts" setup>
import {Board} from "../mixins/types";
import {helpers, required} from "@vuelidate/validators";
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";

// Properties declaration
const props = defineProps<{
  boardsData: Board[]
}>();
// Emits declaration
const emit = defineEmits(["deleteBoard", "createBoard", "isEditingBoard", "updateBoard"]);

// Validations
const rules = {
  collection: {
    $each: helpers.forEach({
      title: {
        required
      },
    })
  }
};
const state = reactive({
  collection: props.boardsData
});
const v$ = useVuelidate(rules, state);
const handleSubmit = async () => {
  return await v$.value.$validate();
};

// Emits for boards
const deleteBoard = (boardIndex: number) => {
  emit("deleteBoard", boardIndex);
};

const createBoard = () => {
  emit("createBoard");
};

const isEditingBoard = (boardIndex: number) => {
  if (props.boardsData[boardIndex].is_adding_board) {
    deleteBoard(boardIndex);
  } else {
    emit("isEditingBoard", {
      boardIndex: boardIndex,
      is_editing_board: !props.boardsData[boardIndex].is_editing_board
    });
  }
};

const boardInputs = ref(props.boardsData);

const updateBoard = async (boardIndex: number) => {
  if (await handleSubmit()) {
    emit("updateBoard", {
      boardIndex: boardIndex,
      newBoard: boardInputs.value[boardIndex]
    });
  }
};
</script>

<template>
  <div
      v-for="(board, boardIndex) in boardsData" :key="board"
      :class="{
        errorName: v$.collection.$each.$response.$errors[boardIndex].title.length,
      }"
      class="flex flex-column bg-white-alpha-30 border-round-xl m-3">
    <div class="flex justify-content-between">
      <div v-if="boardsData[boardIndex].is_editing_board" class="flex flex-column p-3">
        <label
            :class="{'p-error':v$.collection.$each.$response.$errors[boardIndex].title.length}"
            for="name">Title*</label>
        <InputText v-model="boardInputs[boardIndex].title" placeholder="Add title for board" type="text"/>
        <div v-for="error in v$.collection.$each.$response.$errors[boardIndex].title" :key="error" class="p-error">
          {{ error.$message.replace('Value', 'Title') }}
        </div>
      </div>
      <RouterLink v-else :to="`/${boardIndex}`" class="no-underline text-color-secondary">
        <div class="p-3">
          <h2>{{ board?.title }}</h2>
        </div>
      </RouterLink>
      <div v-if="boardsData[boardIndex].is_editing_board" class="flex align-items-center p-3">
        <i class="pi pi-check mx-3 cursor-pointer" style="color: darkgreen" @click="updateBoard(boardIndex)"></i>
        <i class="pi pi-times cursor-pointer" style="color: darkred" @click="isEditingBoard(boardIndex)"></i>
      </div>
      <div v-else class="flex align-items-center p-3">
        <i class="pi pi-pencil mx-3 cursor-pointer" style="color: darkblue" @click="isEditingBoard(boardIndex)"></i>
        <i class="pi pi-trash cursor-pointer" style="color: darkred" @click="deleteBoard(boardIndex)"></i>
      </div>
    </div>
  </div>
  <div class="flex flex-column">
    <TheButton class="m-3" label="+ Add new board" @click="createBoard()"/>
  </div>
</template>

<style scoped>

</style>