import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vuerouter from 'vue-router';
import { routes } from './router/router';
import Veevalidate from "vee-validate"
import store from "./store/store";

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(vuerouter);
Vue.use(Veevalidate);
const router = new vuerouter({
  routes,
  mode: 'history'
});

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
