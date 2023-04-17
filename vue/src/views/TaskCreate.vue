<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Create Tasksss</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <form @submit.prevent="saveTask">  
                <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
            
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                            <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                autocomplete="title" 
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                placeholder="Title"
                                v-model="tasks.title" 
                            />
                            </div>
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Deadline</label>
                            <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input 
                                    type="datetime-local" 
                                    name="deadline" 
                                    id="deadline" 
                                    autocomplete="deadline" 
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                    placeholder="Deadline" 
                                    v-model="tasks.deadline"
                                />
                            </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div class="mt-2">
                            <textarea 
                                id="description" 
                                name="description" 
                                rows="3" 
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Task description" 
                                v-model="tasks.description"
                            />
                            </div>
                        </div>

                    </div>
                    </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                </div>
                </div>
            </form>
        </div>
      </main>
    
  </template>
  
  <script setup>
    import  store  from "../store";
    import { useRouter, useRoute } from "vue-router";
    import { ref, watch, computed } from "vue";

    const userId = store.state.user.id;

    const router = useRouter();
    const route = useRoute();

    let tasks = ref({
        title: '',
        deadline: '',
        description: '',
        status: '1',
        user_id: userId
    });

    watch(
    () => store.state.currentTasks.data,
    (newVal, oldVal) => {
        tasks.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        };
        
    }
    );

    if (route.params.id) {
    store.dispatch('getTask', route.params.id);
    }
    function saveTask() {
    store.dispatch("saveTasks", tasks.value).then(() => {
        router.push({
                name: "Task",
            })
        })
    }



  </script>