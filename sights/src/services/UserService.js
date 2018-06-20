import Api from '@/services/Api';

export default {
  profile() {
    return Api().get('/users/profile');
  },
  getPublicProfile(username) {
    return Api().get('/users', { params: { u: username } });
  },
};
