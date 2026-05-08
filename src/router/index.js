import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard: kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Nếu chưa đăng nhập và không phải trang login → chuyển về login
  if (!token && to.name !== "login") {
    return next({ name: "login" });
  }

  // Nếu đã đăng nhập mà vào trang login → chuyển về trang chính
  if (token && to.name === "login") {
    return next({ name: "contactbook" });
  }

  next();
});

export default router;

