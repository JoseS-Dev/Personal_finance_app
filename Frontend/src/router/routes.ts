import {createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue';
import Register from '../Pages/Register.vue';
import Login from '../Pages/Login.vue';
import Admin from '../Pages/Admin.vue';
import Reportes from '../Pages/Reportes.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BACKEND_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/admin/reportes',
            name: 'Reportes',
            component: Reportes
        }
    ]

})
export default router;