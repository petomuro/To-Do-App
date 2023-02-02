<script lang="ts" setup>
import TheLists from "../components/TheLists.vue";
import {
  boardsLocalStorage,
  convert2DTo1D,
  findListIndexById,
  findTodoIndexById,
  listsLocalStorage,
  getLastIndex
} from "../mixins/utils";
import {Board, List} from "../mixins/types";
import useStore from "../store";
import {Ref, ref} from "vue";
import {useRoute} from "vue-router";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";

// Local storage
const store = useStore();

// Variables
const boardsData: Ref<Board> = ref({} as Board);
const listsData: Ref<List[]> = ref([] as List[]);

// Router
const route = useRoute();
const id = parseInt(route.params.id as string);

// Confirm
const confirm = useConfirm();

// Toast
const toast = useToast();

// Data filtering
const filtering = ref(false);
const textInputFilter = ref("");
const doneInputFilter = ref(false);
const inProgressInputFilter = ref(false);

// Local storage function
const storeData = () => {
  store.setLists(id, listsData.value);
};

// MockApi data fetch functions
const fetchMockApiData = async () => {
  // Fetch data from mockApi
  const mockApiListsData = await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists`);

  return await mockApiListsData.json() as List[];
};

const fetchFromMockApi = async () => {
  // Try to fetch data from mockApi and store them to local storage
  try {
    const mockApiBoardsData = await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}`);
    boardsData.value = await mockApiBoardsData.json() as Board;
    listsData.value = await fetchMockApiData();
    storeData();

    // if (!filtering.value) {
    //   toast.add({severity: "success", summary: "Success Message", detail: "Data fetched successfully", life: 3000});
    // }
  } catch (error) {
    // If filtering is turned off
    if (!filtering.value) {
      // Show error toast if some error occurs
      toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
    }
  }
};

// Check if mockApi has som new data
const hasNewData = async () => {
  // Fetch data from mockApi
  const mockApiLists = (await fetchMockApiData());
  // Get data from local storage
  const localStorage = listsLocalStorage(id).value;
  // Map mockApi list todos and convert them to 1D array
  const mockApiTodos = convert2DTo1D(mockApiLists.map(list => list.todos));
  // Map local storage list todos and convert them to 1D array
  const localStorageTodos = convert2DTo1D(localStorage.map(list => list.todos));

  // Return mockApi has/hasn't new lists or todos
  return (mockApiLists.length !== localStorage.length) || (mockApiTodos.length !== localStorageTodos.length);
};

// Load data from mockApi or local storage function
const fetchData = async () => {
  // If new data was added to mockApi
  if (await hasNewData()) {
    // Fetch them and store to local storage
    await fetchFromMockApi();
  } else {
    // Else get data from local storage
    boardsData.value = boardsLocalStorage().value.find(board => board.id == id) as Board;
    listsData.value = listsLocalStorage(id).value;
  }
};

// Data filtering functions
const filterByText = () => {
  // Go through all lists, find all todos that corresponds to the values entered in filter and write them to reactive variable
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({
                                                        title,
                                                        content,
                                                        deadline
                                                      }) => [title, content, new Date(deadline).toLocaleString("sk-SK")].some(val => val.toLowerCase().includes(textInputFilter.value.toLowerCase())));
  });
};

const filterByDone = () => {
  // Filter data by done
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({is_done_todo}) => [is_done_todo].some(val => val === doneInputFilter.value));
  });
};

const filterByInProgress = () => {
  // Filter data by in progress
  listsData.value.forEach((list, index) => {
    listsData.value[index].todos = list.todos.filter(({is_done_todo}) => [is_done_todo].some(val => !val === inProgressInputFilter.value));
  });
};

const filter = async () => {
  // Is filtering
  filtering.value = true;

  // Load data from mockApi or local storage
  await fetchData();

  // If filtering only by text
  if (textInputFilter.value !== "" && !doneInputFilter.value && !inProgressInputFilter.value) {
    // Filter by text
    filterByText();
  } else if (textInputFilter.value === "" && doneInputFilter.value && !inProgressInputFilter.value) {
    // Else if filtering only by done
    filterByDone();
  } else if (textInputFilter.value === "" && !doneInputFilter.value && inProgressInputFilter.value) {
    // Else if filtering only by in progress
    filterByInProgress();
  } else if (textInputFilter.value === "" && doneInputFilter.value && inProgressInputFilter.value) {
    // Else if filtering only by done and in progress
    filterByDone();
    filterByInProgress();
  } else if (textInputFilter.value !== "" && doneInputFilter.value && !inProgressInputFilter.value) {
    // Else if filtering only by text and done
    filterByText();
    filterByDone();
  } else if (textInputFilter.value !== "" && !doneInputFilter.value && inProgressInputFilter.value) {
    // Else if filtering only by text and in progress
    filterByText();
    filterByInProgress();
  } else if (textInputFilter.value !== "" && doneInputFilter.value && inProgressInputFilter.value) {
    // Else if filtering by all
    filterByText();
  } else {
    // Else not filtering
    filtering.value = false;
  }
};

// CRUD for lists functions
const deleteListFromMockApi = async (listId: number) => {
  // Try delete data from mockApi
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${listId}`, {
      method: "DELETE"
    });
    toast.add({severity: "success", summary: "Success Message", detail: "List deleted successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const deleteList = (listId: number) => {
  // Show confirmation dialog on data deletion
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // Find index of list
      const listIndex = findListIndexById(listsData.value, listId);
      // Delete list from reactive variable
      listsData.value.splice(listIndex, 1);
      // Delete list from mockApi
      await deleteListFromMockApi(listId);
      // Fetch new data from mockApi and store them to local storage
      await fetchFromMockApi();

      // If filtering
      if (filtering.value) {
        // Call filter
        await filter();
      }
    },
    reject: () => {
      // toast.add({severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000});
    }
  });
};

const createList = async () => {
  // Push new list to reactive variable
  listsData.value.push({
    id: listsData.value.length + 1,
    boardId: id,
    name: "",
    is_adding_list: true,
    is_editing_list: false,
    todos: []
  });
  // Get last index
  const lastListIndex = getLastIndex(listsData.value);
  // Start editing new list
  await isEditingList({listIndex: lastListIndex, is_editing_list: true});
};

const closeEditingNewList = () => {
  // Pop new list from reactive variable
  listsData.value.pop();
};

const isEditingList = async (e: any) => {
  // Start/stop editing
  listsData.value[e.listIndex].is_editing_list = e.is_editing_list;

  // If editing is false
  if (!e.is_editing_list) {
    // Fetch data from mockApi or local storage
    await fetchData();
  }
};

const createListInMockApi = async (e: any) => {
  // Try to create new list on mockApi
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
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateListToMockApi = async (e: any) => {
  // Try to update list to mockApi
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${e.listId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(listsData.value[e.listIndex])
    });
    toast.add({severity: "success", summary: "Success Message", detail: "List updated successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const updateList = async (e: any) => {
  // Store new list data to reactive variable
  listsData.value[e.listIndex] = e.newList;
  // Stop editing
  listsData.value[e.listIndex].is_editing_list = false;

  // If adding list is true
  if (listsData.value[e.listIndex].is_adding_list) {
    // Clear is adding board
    listsData.value[e.listIndex].is_adding_list = false;

    // Create new list on mockApi
    await createListInMockApi(e);
  } else {
    // Else update list to mockApi
    await updateListToMockApi(e);
  }

  // Fetch data from mockApi and store them to local storage
  await fetchFromMockApi();

  // If filtering
  if (filtering.value) {
    // Call filter
    await filter();
  }
};

// CRUD for todos functions
const updateTodoToMockApi = async (listId: number, listIndex: number) => {
  // Try to update data to mockApi if deleting, creating or updating to do
  try {
    await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${id}/lists/${listId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(listsData.value[listIndex])
    });
    toast.add({severity: "success", summary: "Success Message", detail: "Todo updated successfully", life: 3000});
  } catch (error) {
    // Show error toast if some error occurs
    toast.add({severity: "error", summary: "Error Message", detail: error, life: 3000});
  }
};

const deleteTodo = (e: any) => {
  // Show confirmation dialog on data deletion
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // Find index of list
      const listIndex = findListIndexById(listsData.value, e.listId);
      // Find index of to do
      const todoIndex = findTodoIndexById(listsData.value[listIndex].todos, e.todoId);
      // Delete to do from reactive variable
      listsData.value[listIndex].todos.splice(todoIndex, 1);
      // Update to do to mockApi
      await updateTodoToMockApi(e.listId, listIndex);
      // Fetch new data from mockApi and store them to local storage
      await fetchFromMockApi();

      // If filtering
      if (filtering.value) {
        // Call filter
        await filter();
      }
    },
    reject: () => {
      // toast.add({severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000});
    }
  });
};

const createTodo = async (listId: number) => {
  // Find list index
  const listIndex = findListIndexById(listsData.value, listId);

  // Push new to do to reactive variable
  listsData.value[listIndex].todos.push({
    id: listsData.value[listIndex].todos.length + 1,
    title: "",
    content: "",
    deadline: "",
    is_adding_todo: true,
    is_editing_todo: false,
    is_done_todo: false,
  });
  // Get last index
  const lastTodoIndex = getLastIndex(listsData.value[listIndex].todos);
  // Start editing new to do
  await isEditingTodo({listIndex: listIndex, todoIndex: lastTodoIndex, is_editing_todo: true});
};

const closeEditingNewTodo = (listIndex: number) => {
  // Pop new to do from reactive variable
  listsData.value[listIndex].todos.pop();
};

const isEditingTodo = async (e: any) => {
  // Start/stop editing
  listsData.value[e.listIndex].todos[e.todoIndex].is_editing_todo = e.is_editing_todo;

  // If editing is false
  if (!e.is_editing_todo) {
    // Fetch data from mockApi or local storage
    await fetchData();
  }
};

const updateTodo = async (e: any) => {
  // Store new to do data to reactive variable
  listsData.value[e.listIndex].todos[e.todoIndex] = e.newTodo;
  // Clear adding
  listsData.value[e.listIndex].todos[e.todoIndex].is_adding_todo = false;
  // Stop editing
  listsData.value[e.listIndex].todos[e.todoIndex].is_editing_todo = false;
  // Update to do to mockApi
  await updateTodoToMockApi(e.listId, e.listIndex);
  // Fetch data from mockApi and store them to local storage
  await fetchFromMockApi();

  // If filtering
  if (filtering.value) {
    // Call filter
    await filter();
  }
};

const toggleDoneTodo = async (e: any) => {
  // Store is done to reactive variable
  listsData.value[e.listIndex].todos[e.todoIndex].is_done_todo = e.is_done_todo;
  // Update to do to mockApi
  await updateTodoToMockApi(e.listId, e.listIndex);
  // Fetch data from mockApi and store them to local storage
  await fetchFromMockApi();

  // If filtering
  if (filtering.value) {
    // Call filter
    await filter();
  }
};

// Load data from mockApi or local storage
await fetchData();
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
          :filtering="filtering" :lists-data="listsData" @delete-list="deleteList($event)"
          @create-list="createList()" @close-editing-new-list="closeEditingNewList()"
          @is-editing-list="isEditingList($event)" @update-list="updateList($event)"
          @delete-todo="deleteTodo($event)" @create-todo="createTodo($event)"
          @close-editing-new-todo="closeEditingNewTodo($event)" @is-editing-todo="isEditingTodo($event)"
          @update-todo="updateTodo($event)" @done-todo="toggleDoneTodo($event)"/>
    </div>
  </div>
</template>

<style scoped>

</style>