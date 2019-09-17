import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'
import BootstrapVue from 'bootstrap-vue'
import { required, confirmed, length, email } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match'
});

extend('length', {
  ...length,
  message: 'This field must have 2 options'
});

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
