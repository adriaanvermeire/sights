import store from '../store';

export const auth = {
  ifNotAuthenticated(to, from, next) {
    if (!store.getters.isAuthenticated) {
      next();
    }
  },
  ifAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  },
};

export default { auth };
