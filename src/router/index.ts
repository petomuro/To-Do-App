import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "IntroPage",
      component: () => import("../pages/IntroPage.vue"),
    },
    {
      path: "/:id",
      name: "Board",
      component: () => import("../pages/BoardPage.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      name: "NotFound",
      // route level code-splitting
      // this generates a separate chunk (NotFound.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/NotFoundPage.vue"),
    },
  ],
});
