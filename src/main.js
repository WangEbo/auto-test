import Vue from 'vue'
import App from './App.vue'
import { request } from './utils/request'
import router from "./router/router";
import store from "./store";

Vue.config.productionTip = false


Vue.prototype.$request = request;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
