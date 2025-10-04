import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

const RegisterPage = () => import("../views/Register.vue");
const LoginPage = () => import("../views/Login.vue");
const DashboardPage = () => import("../views/Dashboard.vue");
// const ProductList = () => import("../views/ProductList.vue");
// const ProductCreate = () => import("../views/CreateProduct.vue");
// const ProductDetail = () => import("../views/ProductDetail.vue");
// const NotFound = () => import("../views/NotFound.vue");

const routes = [
  //   { path: "/", redirect: "/dashboard" },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: { guest: true },
  },

  // protected routes
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  //   {
  //     path: "/products",
  //     name: "ProductList",
  //     component: ProductList,
  //     meta: { requiresAuth: true },
  //   },
  //   {
  //     path: "/products/create",
  //     name: "ProductCreate",
  //     component: ProductCreate,
  //     meta: { requiresAuth: true },
  //   },
  //   {
  //     path: "/products/:id",
  //     name: "ProductDetail",
  //     component: ProductDetail,
  //     meta: { requiresAuth: true },
  //   },

  // fallback
  //   { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated) {
      await auth.getUser().catch(() => {});
    }
    if (!auth.isAuthenticated) {
      return { name: "Login", query: { redirect: to.fullPath } };
    }
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: "Dashboard" };
  }

  return true;
});

export default router;
