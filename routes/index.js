const router = require('express').Router();
const routesController = require('../controller/routes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.route('/')
    .get(routesController.htmlIndex);
router.routte('/notes')
    .get(routesController.htmlNotes);
module.exports = router;