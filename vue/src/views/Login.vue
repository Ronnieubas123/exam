<template>
     <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ ' ' }}
                <router-link :to="{ name: 'Register'}" class="font-medium text-sky-400 hover:text-sky-300">
                    Sign-in
                </router-link>
            </p>
        </div>
        <form @submit="login">
          <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
            {{ errorMsg }}
              <span @click="errorMsg= ''" class="w-8 h-8 flex item-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
          </div>
          <p class="mb-4">Please login to your account</p>
          <input type="hidden" name="remember" value="true" />
          <div class="mb-4">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email-address"
              placeholder="Username"
              v-model="user.email"
              required=""
              autocomplete="email"
              name="email"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              placeholder="password"
              name="passowrd"
              autocomplete="current-password"
              required=""
              v-model="user.password"
            />
          </div>
          <div class="text-center pt-1 mb-12 pb-1">
            <button
              class="bg-sky-400 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Log in
            </button>
          </div>
              
        </form>
</template>
<script setup>
import store from '../store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
}

let errorMsg = ref('');

console.log(user);
function login(ev) {
  ev.preventDefault();
  store.dispatch('login', user)
    .then(() => {
          router.push({ 
             name: 'Dashboard'
          })
    })
    .catch(err => {
      errorMsg.value = err.response.data.error
    })
}
</script>