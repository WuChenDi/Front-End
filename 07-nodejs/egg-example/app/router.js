'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/', controller.admin.users.index);
  router.post('/postegg', controller.home.postegg);
  router.put('/putegg', controller.home.putegg);
  router.patch('/patchegg', controller.home.patchegg);
  router.del('/deleteegg', controller.home.deleteegg);

  router.resources('/user', controller.user);

  router.get('/getuser', controller.user.getUser);

  router.get('/weather', controller.weather.weather);
};
