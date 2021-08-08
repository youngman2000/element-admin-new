const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}
const user = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'i am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin',

    },
    'edit-token': {
        roles: ['editor'],
        introduction: 'i am an editor',
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name: 'Normal Editor'
    }
}
module.exports = [
    {
        url: '/vue-element-admin/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password ar incorrect'
                }
            }
            return {
                code: 20000,
                data: token
            }
        }
    },
    {
        url: '/vue-element-admin/user/info',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = user[token]
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed,unable to get user details'
                }
            }
            return {
                code: 20000,
                data: info
            }
        }
    },
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]