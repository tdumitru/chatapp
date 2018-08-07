import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', 
            component: require('./components/Chat.vue').default
        },
        {
            path: '/login', 
            component: require('./components/Login.vue').default
        }
    ]
})


export default router