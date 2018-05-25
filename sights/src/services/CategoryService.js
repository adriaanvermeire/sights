import Api from '@/services/Api';

export default {
  addCategory(category) {
    return Api().post('/categories', category);
  },
};
