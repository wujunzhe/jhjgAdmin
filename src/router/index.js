import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue'),
        redirect: '/home/tableList',
        children: [{
                path: 'tableList',
                name: 'TableList',
                component: () =>
                    import ('../views/TableManage/index.vue'),
                meta: {
                    name: '餐桌管理'
                }
            },
            {
                path: 'orderList',
                name: 'OrderList',
                component: () =>
                    import ('../views/OrderManage/index.vue'),
                meta: {
                    name: '订单管理'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/index.vue')
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const token = store.state.token;
    if (to.path !== '/login' && !token) {
        document.title = '登陆';
        next({
            name: 'Login'
        })
    } else {
        if (to.meta.name) {
            document.title = to.meta.name
        }
        next()
    }
})

export default router