import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: {
            isLogin: false,
            username: '',
            isAdmin: false,
            canAdd: false
        }
    },
    mutations: {
        login (state, resp) {
            if (resp === null) return
            state.status.isLogin = true
            state.status.username = resp.userName
            state.status.isAdmin = resp.isAdmin
            state.status.canAdd = resp.canAdd
        },
        logout (state) {
            state.status.isLogin = false
            state.status.username = ''
            state.status.isAdmin = false
        }
    },
    actions: {}
})