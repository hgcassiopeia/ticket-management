import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Report from './views/Report.vue'
import Ticket from './views/Ticket.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Report', component: Report },
        { path: '/ticket', name: 'Ticket', component: Ticket }
    ]
})

createApp(App).use(router).mount('#app')
