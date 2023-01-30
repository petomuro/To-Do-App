<script lang="ts" setup>
import TheLists from "../components/TheLists.vue";
import useStore from "../store";
import {findListIndexById, findTodoIndexById} from "../mixins/utils";
import {Board, List} from "../mixins/types";
import {Ref, ref} from "vue";
import {useRoute} from "vue-router";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";

// Router
const route = useRoute();
const id = parseInt(route.params.id as string);

const boardsData: Ref<Board> = ref({} as Board);
const listsData: Ref<List[]> = ref([] as List[]);
const store = useStore();

// Local storage
const storeData = () => {
  store.setLists(id, listsData.value);
};

// Confirm
const confirm = useConfirm();

// Toast
const toast = useToast();

// MockApi data fetch function
const fetchMockApiData = async () => {
  try {
    const mockApiBoardsData = await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}`);
    const mockApiListsData = await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists`);
    const normalizedBoardsData = await mockApiBoardsData.json() as Board;
    const normalizedListsData = await mockApiListsData.json() as List[];
    boardsData.value = normalizedBoardsData;
    listsData.value = normalizedListsData;
    storeData();
    toast.add({severity: "success", summary: "Success Message", detail: "Data fetched successfully", life: 3000});
  } catch (error) {
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

// Load data from mockApi or local storage function
const fetchData = async () => {
  store.$state.boardId = id;

  if (store.getBoards && store.getLists) {
    boardsData.value = (JSON.parse(store.getBoards) as Board[]).find(board => board.id == id) as Board;
    listsData.value = (JSON.parse(store.getLists) as List[]);
  } else {
    await fetchMockApiData();
  }
};

await fetchData();

// Data filtering
const filtering = ref(false);
const textInputFilter = ref("");
const doneInputFilter = ref(false);
const inProgressInputFilter = ref(false);

const filterByText = () => {
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({
                                                        title,
                                                        content,
                                                        deadline
                                                      }) => [title, content, new Date(deadline).toLocaleString("sk-SK")].some(val => val.toLowerCase().includes(textInputFilter.value.toLowerCase())));
  });
};

const filterByDone = () => {
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({is_done_todo}) => [is_done_todo].some(val => val === doneInputFilter.value));
  });
};

const filterByInProgress = () => {
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({is_done_todo}) => [is_done_todo].some(val => !val === inProgressInputFilter.value));
  });
};

const isFiltering = () => {
  if (textInputFilter.value !== "" && !doneInputFilter.value && !inProgressInputFilter.value) {
    filterByText();

    return true;
  } else if (textInputFilter.value === "" && doneInputFilter.value && !inProgressInputFilter.value) {
    filterByDone();

    return true;
  } else if (textInputFilter.value === "" && !doneInputFilter.value && inProgressInputFilter.value) {
    filterByInProgress();

    return true;
  } else if (textInputFilter.value === "" && doneInputFilter.value && inProgressInputFilter.value) {
    filterByDone();
    filterByInProgress();

    return true;
  } else if (textInputFilter.value !== "" && doneInputFilter.value && !inProgressInputFilter.value) {
    filterByText();
    filterByDone();

    return true;
  } else if (textInputFilter.value !== "" && !doneInputFilter.value && inProgressInputFilter.value) {
    filterByText();
    filterByInProgress();

    return true;
  } else if (textInputFilter.value !== "" && doneInputFilter.value && inProgressInputFilter.value) {
    filterByText();

    return true;
  }

  return false;
};

const filter = async () => {
  await fetchData();

  filtering.value = isFiltering();
};

// CRUD for lists
const deleteListFromMockApi = async (listId: number) => {
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${listId}`, {
      method: "DELETE"
    });
    toast.add({severity: "success", summary: "Success Message", detail: "List deleted successfully", life: 3000});
  } catch (error) {
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const deleteList = async (listId: number) => {
  await confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      const listIndex = findListIndexById(listsData.value, listId);
      listsData.value.splice(listIndex, 1);
      await deleteListFromMockApi(listId);
      storeData();
    },
    reject: () => {
      toast.add({severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000});
    }
  });
};

const createList = async () => {
  listsData.value.push({
    id: listsData.value.length + 1,
    boardId: id,
    name: "",
    is_adding_list: true,
    is_editing_list: false,
    todos: []
  });
  const lastListIndex = listsData.value.length - 1;
  await isEditingList({listIndex: lastListIndex, is_editing_list: true});
};

const isEditingList = async (e: any) => {
  listsData.value[e.listIndex].is_editing_list = e.is_editing_list;

  if (!e.is_editing_list) {
    await fetchData();
  }
};

const createListInMockApi = async (e: any) => {
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: listsData.value[e.listIndex].name
      })
    });
    toast.add({severity: "success", summary: "Success Message", detail: "List created successfully", life: 3000});
  } catch (error) {
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateListToMockApi = async (e: any) => {
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${e.listId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(listsData.value[e.listIndex])
    });
    toast.add({severity: "success", summary: "Success Message", detail: "List updated successfully", life: 3000});
  } catch (error) {
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateList = async (e: any) => {
  listsData.value[e.listIndex] = e.newList;
  listsData.value[e.listIndex].is_editing_list = false;

  if (listsData.value[e.listIndex].is_adding_list) {
    listsData.value[e.listIndex].is_adding_list = false;

    await createListInMockApi(e);
  } else {
    await updateListToMockApi(e);
  }

  storeData();
};

// CRUD for todos
const updateTodoToMockApi = async (listId: number, listIndex: number) => {
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${listId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(listsData.value[listIndex])
    });
    toast.add({severity: "success", summary: "Success Message", detail: "Toast updated successfully", life: 3000});
  } catch (error) {
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const deleteTodo = async (e: any) => {
  await confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      const listIndex = findListIndexById(listsData.value, e.listId);
      const todoIndex = findTodoIndexById(listsData.value[listIndex].todos, e.todoId);
      listsData.value[listIndex].todos.splice(todoIndex, 1);
      await updateTodoToMockApi(e.listId, listIndex);
      storeData();
    },
    reject: () => {
      toast.add({severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000});
    }
  });
};

const createTodo = async (listId: number) => {
  const listIndex = findListIndexById(listsData.value, listId);

  listsData.value[listIndex].todos.push({
    id: listsData.value[listIndex].todos.length + 1,
    title: "",
    content: "",
    deadline: "",
    is_adding_todo: true,
    is_editing_todo: false,
    is_done_todo: false,
  });
  const lastTodoIndex = listsData.value[listIndex].todos.length - 1;
  await isEditingTodo({listIndex: listIndex, todoIndex: lastTodoIndex, is_editing_todo: true});
};

const isEditingTodo = async (e: any) => {
  listsData.value[e.listIndex].todos[e.todoIndex].is_editing_todo = e.is_editing_todo;

  if (!e.is_editing_todo) {
    await fetchData();
  }
};

const updateTodo = async (e: any) => {
  listsData.value[e.listIndex].todos[e.todoIndex] = e.newTodo;
  listsData.value[e.listIndex].todos[e.todoIndex].is_adding_todo = false;
  listsData.value[e.listIndex].todos[e.todoIndex].is_editing_todo = false;
  await updateTodoToMockApi(e.listId, e.listIndex);
  storeData();
};

const toggleDoneTodo = async (e: any) => {
  listsData.value[e.listIndex].todos[e.todoIndex].is_done_todo = e.is_done_todo;
  await updateTodoToMockApi(e.listId, e.listIndex);
  storeData();
};
</script>

<template>
  <div class="flex flex-column">
    <div class="flex justify-content-between align-items-center py-3 px-5 bg-cadet-blue">
      <RouterLink class="no-underline" to="/">
        <h1 class="text-white-alpha-50">todo app</h1>
      </RouterLink>
      <h1 class="mx-3">{{ boardsData?.title }}</h1>
      <div></div>
    </div>
    <div class="py-3 px-5 absolute right-0 z-1">
      <TheAccordion>
        <AccordionTab header="Filter">
          <div class="flex flex-column">
            <span class="p-input-icon-left">
              <i class="pi pi-search z-1"/>
              <InputText v-model="textInputFilter" placeholder="Search" type="text" @input="filter()"/>
            </span>
            <div class="field-checkbox my-3">
              <TheCheckbox v-model="doneInputFilter" :binary="true" input-id="done" @input="filter()"/>
              <label for="done">Done</label>
            </div>
            <div class="field-checkbox">
              <TheCheckbox
                  v-model="inProgressInputFilter" :binary="true" input-id="inProgress"
                  @input="filter()"/>
              <label for="inProgress">In progress</label>
            </div>
          </div>
        </AccordionTab>
      </TheAccordion>
    </div>
    <div class="flex flex-wrap p-3">
      <TheLists
          :filtering="filtering" :lists-data="listsData" @delete-list="deleteList($event)" @create-list="createList()"
          @is-editing-list="isEditingList($event)" @update-list="updateList($event)"
          @delete-todo="deleteTodo($event)" @create-todo="createTodo($event)" @is-editing-todo="isEditingTodo($event)"
          @update-todo="updateTodo($event)" @done-todo="toggleDoneTodo($event)"/>
    </div>
  </div>
</template>

<style scoped>

</style>