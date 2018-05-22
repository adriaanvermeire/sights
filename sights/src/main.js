import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import feather from 'vue-icon';
import Icon from 'vue-awesome/components/Icon';
import App from './App';
import router from './router';
import store from './store';

import './assets/scss/custom-bs.scss';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
// Vue.use(feather);
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
