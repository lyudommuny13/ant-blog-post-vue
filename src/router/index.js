import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false, speed: 400 })

import DashboardView from '../views/DashboardView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import LoginView from '@/views/LoginView.vue'
import ArticleListView from '@/views/article/ArticleListView.vue'
import ArticleCreateView from '@/views/article/ArticleCreateView.vue'
import ArticlePreviewView from '@/views/article/ArticlePreviewView.vue'
import ArticleEditView from '@/views/article/ArticleEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      // meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
          meta: { title: 'Dashboard' }
        },
        {
          path: 'article',
          meta: { title: 'Article' },
          children: [
            {
              path: "",
              name: "article.list",
              component: ArticleListView
            },
            {
              path: "create",
              name: "article.create",
              component: ArticleCreateView,
              meta: { title: 'Article-Create' }
            },
            {
              path: ":id/edit",
              name: "article.edit",
              component: ArticleEditView,
              meta: { title: 'Article-Edit' }
            },
            {
              path: ":articleId",
              name: "article.detail",
              component: ArticlePreviewView,
              meta: { title: 'Article-Detail' }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        // guestOnly: true
      }
    }
  ],
  linkExactActiveClass: 'active',
})

router.beforeEach(async (to, from) => {
  NProgress.start()

  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token

  document.title = to.meta.title ? `${to.meta.title} - My Admin` : "My Admin"

  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      authStore.logout();
      return { name: "login" }
    }
  }

  if (!authStore.isAuthenticated && to.name !== "login") {
    return { name: "login" }
  }

  if (authStore.isAuthenticated && to.name === "login") {
    return { name: "dashboard" }
  }

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (!isAuthenticated) {
  //     return { name: 'login' }
  //   }
  // }

  // if (to.matched.some(record => record.meta.guestOnly)) {
  //   if (isAuthenticated) {
  //     return { name: 'dashboard' }
  //   }
  // }

  return true
})

router.afterEach(() => {
  NProgress.done()
})

export default router