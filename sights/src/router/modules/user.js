import Profile from '@/components/User/Profile';
import MySights from '@/components/User/MySights';
import { auth } from '../middleware';

export default [
  {
    path: '/profile/sights',
    name: 'MySights',
    component: MySights,
    beforeEnter: auth.ifAuthenticated,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: auth.ifAuthenticated,
  },
];
