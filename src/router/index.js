import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("../views/AdminView.vue"),
        },
        {
            path: "/courses",
            name: "courses",
            component: () => import("../views/CoursesView.vue"),
        },
        {
            path: "/user",
            name: "user",
            component: () => import("../views/UserView.vue"),
        },
    ],
});

export default router;
