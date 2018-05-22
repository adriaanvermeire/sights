import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Home/Homepage';
import Profile from '@/components/Profile/Profile';
import Register from '@/components/Auth/Register';
import Login from '@/components/Auth/Login';
import { auth } from '../middleware';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Homepage,
    },
    {
      path: '/profile/sights',
      name: 'MySights',
      component: Homepage,
      beforeEnter: auth.ifAuthenticated,
    },
    {
      path: '/profile/sights/new',
      name: 'NewSight',
      component: Homepage,
      beforeEnter: auth.ifAuthenticated,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: auth.ifAuthenticated,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: auth.ifNotAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: auth.ifNotAuthenticated,
    },
  ],
});
