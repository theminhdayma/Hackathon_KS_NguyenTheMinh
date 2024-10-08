// Định nghĩa danh sách các route
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      redirect: "/admin/dashboard"
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import( "../views/Admin.vue"),
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            component: () => import("../views/Dashboard.vue"),
          },
          {
            path: "manager-user",
            name: "managerUser",
            component: () => import("../views/ManagerUser.vue"),
          },
          {
            path: "manager-product",
            name: "managerProduct",
            component: () => import("../views/ManagerProduct.vue"),
          },
        ]
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("../views/NotFound.vue"),
    },
  ];

export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

