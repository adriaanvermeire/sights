import Api from '@/services/Api';

export default {
  authenticate(credentials) {
    return Api().post('/users/authenticate', credentials);
  },
  register(details) {
    return Api().post('/users/register', details);
  },
};
