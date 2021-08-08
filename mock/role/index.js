const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
    {
        key: 'admin',
        name: 'admin',
        description: 'super administrator,have access to view all pages',

    },
    {
        key: 'editor',
        name: 'editor',
        description: "normal editor can see all pages except permission page",
        routes: routes.filter(i => i.path !== '/permission')
    },
    {
        key: 'visitor',
        name: 'visitor',
        description: 'just a visitor can only see the home page and the document page',
        routes: [{
            path: "",
            redirect: 'dashboard',
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    meta: { title: 'dashboard', icon: 'dashboard' }
                }
            ]
        }]
    }
]
module.exports = [
    {
        url: 'vue-element-admin/routes',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: routes
            }
        }
    },
    {
        url: '/vue-element-admin/roles',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: roles,
            }
        }
    },
    {
        url: '/vue-element-admin/role',
        type: 'post',
        response: {
            code: 20000,
            data: {
                key: Mock.mock('@integer(300,5000)')
            }
        }
    },
    {
        url: '/vue-element-admin/role[A-Za-z0-9]',
        type: 'put',
        response: {
            code: 20000,
            data: { status: 'success' }
        }
    },
    {
        url: "/vue-element-admin/role[A-Za-z0-9]",
        type: 'delete',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    }
]