import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    axios,
    Vuex
});