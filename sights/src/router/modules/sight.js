import NewSight from '@/components/Sights/NewSight';
import Explore from '@/components/Explore/Explore';
import SightRoot from '@/components/Sights/SightRoot';
import SightDetail from '@/components/SightDetail/SightDetail';
import EditSight from '@/components/Sights/EditSight';
import { auth } from '../middleware';

export default [
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    props: route => ({ query: route.query.q }),
  },
  {
    path: '/sights/new',
    name: 'NewSight',
    component: NewSight,
    beforeEnter: auth.ifAuthenticated,
  },
  {
    path: '/sights/:id',
    component: SightRoot,
    children: [
      {
        path: '',
        name: 'SightDetail',
        component: SightDetail,
      },
      {
        path: 'edit',
        name: 'EditSight',
        component: SightDetail,
        props() { return { type: 'edit' }; },
        beforeEnter: auth.ifAuthenticated,
      },
    ],
  },
];
