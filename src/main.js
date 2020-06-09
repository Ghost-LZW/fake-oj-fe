import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import {getRequest} from "@/utils/request"
import {postRequest} from "@/utils/request"
import db from './utils/sessionStorage'
import * as config from './utils/config'
import router from "./router";
import store from "./store";
import {Message} from "element-ui";
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iconPicker)
Vue.use(VueClipboard)

Vue.prototype.$db = db
Vue.prototype.$config = config
Vue.prototype.$message = Message
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
