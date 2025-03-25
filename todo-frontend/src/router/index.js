import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'

const routes = [
    {
        path: '/',
        name: 'all',
        component: TodoList,
        props: { filter: 'all' }
    },
    {
        path: '/active',
        name: 'active',
        component: TodoList,
        props: { filter: 'active' }
    },
    {
        path: '/completed',
        name: 'completed',
        component: TodoList,
        props: { filter: 'completed' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
