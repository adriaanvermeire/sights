import Api from '@/services/Api';

export default {
  addSight(sight) {
    return Api().post('sights/new', sight);
  },
  getSight(id) {
    return Api().get(`sights/${id}`);
  },
  editSight(id) {
    return Api().get(`sights/edit/${id}`);
  },
  updateSight(body) {
    return Api().post('sights/edit', body);
  },
  removeSight(id) {
    return Api().delete(`sights/destroy/${id}`);
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
  addChart(id, chart) {
    return Api().post(`sights/charts/${id}/add`, { ...chart });
  },
  like(id, user) {
    return Api().post(`sights/like/${id}`, { user });
  },
  personal() {
    return Api().get('sights/personal');
  },
};
