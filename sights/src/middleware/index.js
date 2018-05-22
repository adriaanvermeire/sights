

export default {
  auth(to, from, next) {
    if (to.name === 'Callback') { // check if "to"-route is "callback" and allow access
      next();
    } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
      next();
    } else { // trigger auth0 login
      router.app.$auth.login();
    }
  },
};
