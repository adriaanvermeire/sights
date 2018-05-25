import Vue from 'vue';
import Router from 'vue-router';
// Router modules
import AuthRoutes from './modules/auth';
import UserRoutes from './modules/user';
import SightRoutes from './modules/sight';
import GeneralRoutes from './modules/general';
import AdminRoutes from './modules/admin';

Vue.use(Router);

export default new Router({
  routes: [
    ...AuthRoutes,
    ...UserRoutes,
    ...SightRoutes,
    ...GeneralRoutes,
    ...AdminRoutes,
  ],
});
