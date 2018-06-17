const passport = require('passport');
const Sight = require('../models/sight');

exports.auth = passport.authenticate('jwt', { session: false });
exports.filterAuth = passport.authenticate('jwt', { session: false, failureRedirect: '/sights/search/noAuth' });
exports.ownSight = async function ownSight(req, res, next) {
  const id = req.params.id || req.params.sightId || req.body.currentSight;
  if (id) {
    const sight = await Sight.findById(id).lean().exec();
    console.log(sight.author, req.user.id);
    if (sight.author.toString() === req.user.id) {
      next();
    } else {
      res.status(404).send({ error: 'Sight not found!' });
    }
  }
};

