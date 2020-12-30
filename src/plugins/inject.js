import axios from './axios'
import api from './api'

// 全局ajax
global.ajax = axios

export default {
  install: (Vue, options) => {
    // 需要挂载的都放在这里
    Vue.config.globalProperties.$ajax = axios
    Vue.config.globalProperties.$api = api
  }
}