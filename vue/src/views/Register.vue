<template>
    <div>
           <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
           <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign-up to create an account</h2>
           <p class="mt-2 text-center text-sm text-gray-600">
               Or
               {{ ' ' }}
               <router-link :to="{ name: 'Login'}" class="font-medium text-sky-400 hover:text-sky-300">
                    Sign-in
                </router-link>
           </p>
       </div>
       <form @submit="register">
          <input type="hidden" name="remember" value="true" />  
          <div class="mb-4">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="fullname"
              placeholder="Full Name"
              name="name"
              autocomplete="name"
              required=""
              v-model="user.name"
            />
          </div>
          <div class="mb-4">
            <input
              type="email"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email-address"
              placeholder="Email Address"
              name="email"
              autocomplete="email"
              required=""
              v-model="user.email"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="confirmpassword"
              placeholder="Password"
              name="password"
              autocomplete="current-passwor"
              required=""
              v-model="user.password"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              placeholder="Confirm Password"
              name="password"
              autocomplete="current-passwor"
              required=""
              v-model="user.password_confirmation"
            />
          </div>
          <div class="text-center pt-1 mb-12 pb-1">
            <button
              class="bg-sky-400 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
            <a class="text-gray-500" href="#!">Forgot password?</a>
          </div>
        </form>
</template>
<script setup>
  import store from "../store"
  import { useRouter } from "vue-router"

  const router = useRouter();

  const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  
  function register(ev) {
    ev.preventDefault();
    store
      .dispatch('register', user)
      .then((res) => {
        router.push({
          name: 'Dashboard'
        })
      })
  }
</script>
