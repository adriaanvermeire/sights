import Register from '@/components/Auth/Register';
import Login from '@/components/Auth/Login';
import { auth } from '../middleware';

export default [
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
];
