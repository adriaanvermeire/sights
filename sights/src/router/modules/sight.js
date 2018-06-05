import NewSight from '@/components/Sights/NewSight';
import Explore from '@/components/Sights/Explore';
import SightDashboard from '@/components/Sights/SightDashboard';
import { auth } from '../middleware';

export default [
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
  },
  {
    path: '/sights/new',
    name: 'NewSight',
    component: NewSight,
    beforeEnter: auth.ifAuthenticated,
  },
  {
    path: '/sights/:id',
    name: 'SightDashboard',
    component: SightDashboard,
  },
];
