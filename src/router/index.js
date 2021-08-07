import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'

// import documentation from '@/views/documentation/index'

export const asyncRoutes = [{}]
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        // hidden: true,
    },
    {
        path: '/',
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/documentation',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/documentation/index'),
                name: 'Documentation',
                meta: { title: 'Documentation', icon: 'documentation', affix: true }
            }
        ]
    }
]
const createRouter = () => new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})
const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
