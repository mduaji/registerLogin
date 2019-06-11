import dashboard from "../components/HelloWorld.vue";
//import view from "../components/view.vue";
import login from "../components/login.vue";
import listdata from "../components/list.vue";
import empdata from "../components/emplist.vue"

export const routes = [
    { path: '/login', component: login },
    // { path: '/dashboard', component: dashboard },
    { path: '/viewList/:Email', component: listdata },
    { path: '/EmpList/:Email', component: empdata },
    { path: '*', redirect: '/login' },
    //{ path: '/list', component: listdata }
]