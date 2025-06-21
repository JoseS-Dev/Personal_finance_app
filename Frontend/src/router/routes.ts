import {createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue';
import Register from '../Pages/Register.vue';
import Login from '../Pages/Login.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BACKEND_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]

})
export default router;