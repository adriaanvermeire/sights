import Api from '@/services/Api';

export default {
  addSight(sight) {
    return Api().post('sights/new', sight);
  },
  getSight(id) {
    return Api().get(`sights/${id}`);
  },
  getDatatypes() {
    return Api().get('sights/datatypes');
  },
  getFeatured() {
    return Api().get('sights/featured');
  },
  submitTypes(data) {
    return Api().post('sights/datatypes', data);
  },
  updateCharts(id, charts) {
    return Api().post(`sights/charts/${id}`, { charts });
  },
  like(id, user) {
    return Api().post(`sights/like/${id}`, { user });
  },
};
