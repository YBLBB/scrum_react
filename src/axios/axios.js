import axios from "axios";
import EventBus from "../utils/event";

// console.log(store)

const axiosinstance = axios.create({
    timeout: 5000,
   
});

// 中间件
axiosinstance.interceptors.response.use(function (response) {
    

    if (response.status === 200) {

        if(response.data.code === 401) {
            // 将页面直接跳转到  /login
            // window.location.href = '/login'
     
            EventBus.emit('global_not_login', response.data.msg)
            return Promise.reject('没有登录状态')
        }

        // 全局的错误处理
        if (response.data.code !== 0 && response.data.code !== 401) {
            console.log('emit');
            EventBus.emit('global_error_tips', response.data.msg)
       
        }
    } else {
        
        EventBus.emit('global_error_tips', response.data.message)
  
    }


    return response;
}, function (error) {
     

    EventBus.emit('global_error_tips', error)

    return Promise.reject(error);
});

export default axiosinstance