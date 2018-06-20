import ProfileRoot from '@/components/User/ProfileRoot';
import Profile from '@/components/User/Profile';
import MySights from '@/components/User/MySights';
import LikedSights from '@/components/User/LikedSights';
import Settings from '@/components/User/Settings';
import { auth } from '../middleware';

export default [
  {
    path: '/user/:username',
    component: Profile,
    name: 'PublicProfile',
  },
  {
    path: '/profile',
    component: ProfileRoot,
    children: [
      {
        path: ':username',
        name: 'Profile',
        component: Profile,
      },
      {
        path: 'sights',
        name: 'MySights',
        component: MySights,
        beforeEnter: auth.ifAuthenticated },
      {
        path: 'likes',
        name: 'LikedSights',
        component: LikedSights,
        beforeEnter: auth.ifAuthenticated },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        beforeEnter: auth.ifAuthenticated },
    ],
  },
];
