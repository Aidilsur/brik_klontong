import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";
import DashboardLayout from "../components/DashboardLayout.vue";

const RegisterPage = () => import("../views/Register.vue");
const LoginPage = () => import("../views/Login.vue");
const ProductList = () => import("../views/ProductList.vue");
const ProductAddPage = () => import("../views/AddProduct.vue");
const ProductDetailPage = () => import("../views/ProductDetail.vue");
// const NotFound = () => import("../views/NotFound.vue");

const routes = [
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
    path: "/",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "ProductList",
        component: ProductList,
        meta: { requiresAuth: true },
      },
      {
        path: "/create-product",
        name: "createProduct",
        component: ProductAddPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/product/:id/detail",
        name: "ProductUpdate",
        component: ProductDetailPage,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },
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
