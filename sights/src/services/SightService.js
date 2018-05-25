import Api from '@/services/Api';

export default {
  addSight(sight) {
    return Api().post('sights/new', sight);
  },
  getSight(id) {
    return Api().get(`sights/${id}`);
  },
};