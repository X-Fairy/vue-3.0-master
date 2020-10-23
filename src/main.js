import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './assets/js/http'
Vue.prototype.$http=http
import store from "./stores/index";
Vue.prototype.$store=store
Vue.use(ElementUI);
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
