import Vue from "vue";
import Vuex from 'vuex';
import getters from './getters'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulesPath) => {
    const modulesName = modulesPath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulesPath)
    modules[modulesName] = value.default
    return modules;
}, {})

const store = new Vuex.Store({
    modules,
    getters
})
export default store
