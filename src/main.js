import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getData, setData } from './utils/storage'

/** elementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/** 样式 */
import './styles/global.css';

import MD5 from "js-md5"

Vue.use(ElementUI);
Vue.prototype.$md5 = MD5;
Vue.prototype.$setData = setData;
Vue.prototype.$getData = getData;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')