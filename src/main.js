import Vue from 'vue'
import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'
import './icons'
import './permission'
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.use(Element)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
