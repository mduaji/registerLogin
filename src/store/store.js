import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import vueaxios from 'vue-axios'

Vue.use(Vuex);

Vue.use(vueaxios, axios);

    const state = {
        token: localStorage.getItem('token')
    }
    const mutations = {
        setToken(state, token) {            
            state.token = token
            localStorage.setItem('token', token)
            console.log("set token")
        },
        removeToken(state) {
            console.log("remove token is called")
            state.token = null
            localStorage.removeItem('token')
        }
    }
    const getters = {
        isLoggedIn: state => {
            return state.token != null
        }
    }
    export default new Vuex.Store({
        state,
        getters,
        mutations
    })





