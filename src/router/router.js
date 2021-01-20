import Vue from "vue";
import VueRouter from "vue-router";

const home = () => import('../pages/home/home.vue');
const SearchBar = () => import('../components/SearchBar/SearchBar.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: home
    },
    {
        path: "/SearchBar",
        name: "SearchBar",
        component: SearchBar
    }
];

const router = new VueRouter({
    routes
});

export default router;
