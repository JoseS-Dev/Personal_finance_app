import {createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue';
import Register from '../Pages/Register.vue';
import Login from '../Pages/Login.vue';
import Reportes from '../Pages/Admin.vue';
import Historial from '../Pages/Reportes.vue';
import path from 'path';

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
        /*
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },*/
        {
            path: '/admin/reportes',
            name: 'Reportes',
            component: Reportes
        },
        
        {
            path:'/admin/historial',
            name: 'historial',
            component: Historial
        }
    ]

})
export default router;