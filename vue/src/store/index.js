import { createStore } from 'vuex'
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
            type: sessionStorage.getItem("TYPE"),
            id: sessionStorage.getItem("USERID")
        },
        currentTasks: {
            data: [],
            loading: false
        },
        tasks: {
            data: [],
            loading: false
        }
    },
    getters: {},
    actions: {

        //Task
        saveTasks({commit}, tasks ) {
            let response;
            if (tasks.id) {
                response = axiosClient
                    .put(`tasks/${tasks.id}`, tasks)
                    .then((res) => {
                        commit("setCurrentTasks", res.data);
                        return res;
                    });
            } else {
                response = axiosClient.post("/tasks", tasks).then((res) => {
                    commit("setCurrentTasks", res.data);
                    return res;
                })
            }
        },

        getTasks({ commit }) {
            commit('setTasksLoading', true)
                return axiosClient.get("/tasks").then((res) => {
                    commit('setTasksLoading', false);
                    commit("setTasks", res.data);
                    return res;
                })
        },

        getTask({ commit }, id) {
            commit("setCurrentTasksLoading", true);
            return axiosClient
              .get(`/tasks/${id}`)
              .then((res) => {
                commit("setCurrentTasks", res.data);
                commit("setCurrentTasksLoading", false);
                return res;
              })
              .catch((err) => {
                commit("setCurrentTasksLoading", false);
                throw err;
              });
          },
          deleteTask({ dispatch }, id) {
                return axiosClient.delete(`/tasks/${id}`).then((res) => {
                dispatch('getTasks')
                return res;
                });
            },
            completeStatus({ commit }, buttonValue) {
                let id = buttonValue;
                return axiosClient.get(`/complete-status/${id}`).then((res) => {
                  return res;
                });
            },

        // Auth
        register({ commit }, user ) {
            return axiosClient.post('/register',user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
            })
        },
        login({ commit }, user) {
            return axiosClient.post('/login',user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
    },
    mutations: {
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            state.user.id = userData.id;
            sessionStorage.setItem('DATA', userData.user);
            sessionStorage.setItem('USERID', userData.id);
            sessionStorage.setItem('TOKEN', userData.token);
        },
        setCurrentTasks: (state, currentTasks) => {
            state.currentTasks.data = currentTasks.data;
        },
        setTasksLoading: (state, loading) => {
            state.tasks.loading = loading;
        },
        setTasks: (state, tasks) => {
            state.tasks.data = tasks.data;
        }
    },
    modules: {}
})

export default store;