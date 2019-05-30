
import view from "../components/view.vue";
import login from "../components/login.vue";

export const routes=[
    {path:'/login',component:login},
    {path:'/viewList/:Email',component:view},
    {path:'*',redirect:'/login'}
]