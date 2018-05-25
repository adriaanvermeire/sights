import Api from '@/services/Api';

export default {
  addCategory(category) {
    return Api().post('/categories', category);
  },
  all() {
    return Api().get('/categories');
  },
};
