import Api from '@/services/Api';

export default {
  addSight(sight) {
    return Api().post('sights/new', sight);
  },
  getSight(id) {
    return Api().get(`sights/${id}`);
  },
  getFeaturedSights() {
    return Api().get('sights/explore');
  },
  getDatatypes() {
    return Api().get('sights/datatypes');
  },
  submitTypes(data) {
    return Api().post('sights/datatypes', data);
  },
};
