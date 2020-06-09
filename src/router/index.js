import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('../pages/login')
const home = () => import('../pages/home')
const problems = () => import("../pages/Problem/problems")
const rank = () => import("../pages/rank")
const status = () => import("../pages/Status/status")
const register = () => import("../pages/register")
const manager = () => import("../pages/manager")
const problemDetail = () => import("../pages/Problem/problemDetail")
const problemEdit = () => import("../pages/Problem/problemEdit")
const problemAdd = () => import("../pages/Problem/problemAdd")
const statusDetail = () => import("../pages/Status/statusDetail")
const contest = () => import("../pages/contest")

Vue.use(Router)

const constRouter = [
    {
        path: '/',
        name: "Index",
        redirect: {name: 'home'}
    },
    {
        path: '/home',
        name: "home",
        component: home
    },
    {
        path: '/login',
        name: "login",
        component: login
    },
    {
        path: '/problems',
        name: "problems",
        component: problems
    },
    {
        path: '/rank',
        name: 'rank',
        component: rank
    },
    {
        path: '/status',
        name: 'status',
        component: status
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/manager',
        name: 'manager',
        component: manager
    },
    {
        path: '/problem/detail/:id',
        name: 'problemDetail',
        component: problemDetail
    },
    {
        path: '/problem/edit/:id',
        name: 'problemEdit',
        component: problemEdit
    },
    {
        path: '/problem/add',
        name: 'problemAdd',
        component: problemAdd
    },
    {
        path: '/status/detail/:id',
        name: 'statusDetail',
        component: statusDetail
    },
    {
        path: '/contest',
        name: 'contest',
        component: contest
    }
]

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: constRouter
})

export default router