<script lang="ts" setup>
import {findBoardIndexById} from "../mixins/utils";
import {Board} from "../mixins/types";
import {reactive, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";
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
const deleteBoard = (boardId: number) => {
  emit("deleteBoard", boardId);
};

const createBoard = () => {
  emit("createBoard");
};

const isEditingBoard = (boardId: number) => {
  const boardIndex = findBoardIndexById(props.boardsData, boardId);

  if (props.boardsData[boardIndex].is_adding_board) {
    deleteBoard(boardId);
  } else {
    emit("isEditingBoard", {
      boardIndex: boardIndex,
      is_editing_board: !props.boardsData[boardIndex].is_editing_board
    });
  }
};

const boardInputs = ref(props.boardsData);

const updateBoard = async (boardId: number) => {
  const boardIndex = findBoardIndexById(props.boardsData, boardId);

  if (await handleSubmit()) {
    emit("updateBoard", {
      boardIndex: boardIndex,
      boardId: boardId,
      newBoard: boardInputs.value[boardIndex]
    });
  }
};
</script>

<template>
  <div
      v-for="(board, boardIndex) in boardsData" :key="boardIndex"
      :class="{
        errorName: v$.collection.$each.$response.$errors[boardIndex].title.length,
      }"
      class="flex flex-column justify-content-center bg-gray-200 border-round-xl m-3 w-20rem">
    <div v-if="board?.is_editing_board" class="flex flex-column p-3">
      <label
          :class="{'p-error':v$.collection.$each.$response.$errors[boardIndex].title.length}"
          class="text-primary"
          for="name">Title*</label>
      <InputText v-model="boardInputs[boardIndex].title" placeholder="Add title for board" type="text"/>
      <div v-for="error in v$.collection.$each.$response.$errors[boardIndex].title" :key="error" class="p-error">
        {{ error.$message.replace('Value', 'Title') }}
      </div>
    </div>
    <RouterLink v-else :to="`/${board?.id}`" class="no-underline">
      <div class="flex flex-column justify-content-center p-3">
        <span class="text-primary">Title</span>
        <h2 class="text-black-alpha-90">{{ board?.title }}</h2>
      </div>
    </RouterLink>
    <hr class="mx-1">
    <div v-if="board?.is_editing_board" class="flex align-items-center py-3">
      <i class="pi pi-check mx-3 cursor-pointer text-primary" @click="updateBoard(board?.id)"></i>
      <i class="pi pi-times cursor-pointer text-red-800" @click="isEditingBoard(board?.id)"></i>
    </div>
    <div v-else class="flex align-items-center py-3">
      <i class="pi pi-pencil mx-3 cursor-pointer text-blue-800" @click="isEditingBoard(board?.id)"></i>
      <i class="pi pi-trash cursor-pointer text-red-800" @click="deleteBoard(board?.id)"></i>
    </div>
  </div>
  <div class="flex flex-column">
    <TheButton class="m-3" label="+ Add new board" @click="createBoard()"/>
  </div>
</template>

<style scoped>

</style>