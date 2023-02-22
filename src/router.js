import {createRouter, createWebHistory} from "vue-router";
import asgkLogin from "@/components/asgk-login";
import asgkClientTable from "@/components/asgk-client-table";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: asgkLogin,
        },
        {
            path: '/client-table',
            component: asgkClientTable,
        }
    ]
})