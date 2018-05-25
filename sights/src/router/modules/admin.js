import CreateCategory from '@/components/Category/CreateCategory';

// TODO: Create ADMIN middleware
export default [
  {
    path: '/admin/category/new',
    name: 'CreateCategory',
    component: CreateCategory,
  },
];
