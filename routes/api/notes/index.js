const router = require('express').Router();
const notesController = require('../../../controller/notes');
// GET
router.route('/')
    .get(notesController.getDB)
    .post(notesController.addNote);
router.route('/:id')
    .delete(notesController.deleteNote);
module.exports = router;