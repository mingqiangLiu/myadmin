// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {FormItem,Form,Button,Input,Col,Row,Tabs,TabPane,Message} from 'element-ui'
import axios from './axios'
import store from './store/index.js'

Vue.use(FormItem)
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
		axios,
		store,
		router,
		render: h => h(App)
	})
	.$mount('#app')
