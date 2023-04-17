<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Task List</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            
                <div class="flex justify-between items-center mt-3">
                    <div></div>
                    <router-link 
                        :to="{ name: 'TaskCreate' }" 
                        class="py-2 px-3 text-white bg-sky-400 rounded-md hover:bg-sky-400 text-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 -mt-1 inline-block">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new Task
                    </router-link>
                </div>

                <div v-if="taskLoading" class=" h-fit ">
                      <div class="loader border-t-sky-400 border-10 border-8 rounded-full w-20 h-20 animation-pulse border-t-8 absolute top-1/2 left-1/2"></div>
                 </div>
                 <div v-else>
                        <table class="w-full text-sm">
                            <thead class=" text-left">
                                <tr>
                                    <th></th>
                                    <th class="pt-3 py-3">Title</th>
                                    <th class="pt-3 py-3">Deadline</th>
                                    <th class="pt-3 py-3">Description</th>
                                    <th>Status</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                              <template v-for="tasks in task">
                                <tr v-if="tasks.user_id === userId">
                                        <th><input :value="tasks.id" type="checkbox" id="myCheck" @click="updateStatus($event)"></th>
                                        <td data-label="Title" class="pt-3 py-3">{{ tasks.title}}</td>
                                        <td data-label="Deadline" class="pt-3 py-3">{{ tasks.deadline }}</td>
                                        <td data-label="Sex" class="pt-3 py-3">{{ tasks.description }}</td>
                                        <td data-label="Description" class="pt-3 py-3">
                                            <div class="flex items-center mt-1 justify-center ">
                                                <router-link 
                                                    :to="{name: 'TaskView', params: {id: tasks.id}}"
                                                    class="flex py-2 px-4 text-sky-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                </router-link>
                                                <button type="button" @click="deleteTasks(tasks)"  class="text-red-500 text-left flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                          <template v-if="tasks.status == '1'">
                                              Incomplete
                                          </template>
                                          <template v-else>
                                            Complete
                                          </template>
                                        </td>
                                </tr>
                              </template>
                              
                            </tbody>
                         </table>
                </div>
        </div>
      </main>
</template>
<script setup>
import { ref, computed } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";

const userId = store.state.user.id;

const task = computed(() => store.state.tasks.data);
const taskLoading = computed(() => store.state.tasks.loading);

store.dispatch("getTasks");



function deleteTasks(tasks) {
  if (
    confirm(
      `Are you sure you want to delete this Vaccine? Operation can't be undone!!`
    )
  ) {   
    store.dispatch("deleteTask", tasks.id).then(() => {
        
      store.dispatch("getTasks");
    });
  }
}

function updateStatus(e) {
  var checkBox = document.getElementById("myCheck");
  const buttonValue = e.target.value;
  if (checkBox.checked == true){
    store.dispatch("completeStatus", buttonValue).then(() => {
      location.reload();
      });
  } else {
    alert('not');
  }
}

</script>
<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader {
    animation: spin 2s linear infinite;
}
</style>
