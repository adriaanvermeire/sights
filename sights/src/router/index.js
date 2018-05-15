import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Profile from '@/components/profile/Profile';
import Register from '@/components/authentication/Register';
import Login from '@/components/authentication/Login';

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
    },
    {
      path: '/profile/sights/new',
      name: 'NewSight',
      component: Homepage,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
