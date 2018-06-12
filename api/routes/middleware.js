const passport = require('passport');

exports.auth = passport.authenticate('jwt', { session: false });
exports.filterAuth = passport.authenticate('jwt', { session: false, failureRedirect: '/sights/filter-no-auth' });
