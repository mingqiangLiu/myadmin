import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'
import qs from 'qs'

//
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 开发环境
// if (process.env.NODE_ENV === 'development') {
//    // axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5cb6c41e6fb22e528c7ddcae/baseinfo'
//    axios.defaults.baseURL = 'http://10.69.11.201:8080/springmvc_CROS'
// // 编译环境
// } else {
//     // 测试环境
//     if (process.env.type === 'test') {
//         axios.defaults.baseURL = 'http://test.xxx.com/'
//     // 正式环境
//     } else {
//         axios.defaults.baseURL = 'http://app.xxx.com/'
//     }
// }


const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.withCredentials = true;//让请求携带
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}

	if (config.method=="post"){
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

	return config
}, err => {
	return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
	//获取安全token
	getToken(){
		return instance.get('/getToken?tokenType=auth')
	},
	// 用户注册
	userRegister(data) {
		return instance.post('/api/register', data)
	},
	// 用户登录
	UserLogin(data) {
		return instance.post('/api/login/submit', data)
	},
	// 获取用户
	getUser(data) {
		return instance.get('/username',data)
	},
	// 删除用户
	delUser(data) {
		return instance.post('/api/delUser', data)
	},
	//是否登录
	isLogin(data){
		return instance.post('/islogin', data)
	}
}
