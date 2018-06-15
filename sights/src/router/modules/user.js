import ProfileRoot from '@/components/User/ProfileRoot';
import Profile from '@/components/User/Profile';
import MySights from '@/components/User/MySights';
import LikedSights from '@/components/User/LikedSights';
import Favorites from '@/components/User/Favorites';
import Settings from '@/components/User/Settings';
import { auth } from '../middleware';

export default [
  {
    path: '/profile',
    component: ProfileRoot,
    beforeEnter: auth.ifAuthenticated,
    children: [
      {
        path: '',
        name: 'Profile',
        component: Profile,
      },
      {
        path: 'sights',
        name: 'MySights',
        component: MySights,
      },
      {
        path: 'likes',
        name: 'LikedSights',
        component: LikedSights,
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: Favorites,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
];
