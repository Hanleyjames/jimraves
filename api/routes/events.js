const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth =  require('../middleware/checkauth');
const EventController = require('../controllers/events')

router.get('/', EventController.get_all_events);

router.post('/', checkAuth, EventController.create_new_event);

router.get('/:eventID', EventController.get_single_event);

router.patch('/:eventID', checkAuth, EventController.update_event);

router.delete('/:eventID', checkAuth, EventController.delete_event);

module.exports = router;
