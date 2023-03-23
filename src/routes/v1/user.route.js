const express = require('express');
const { userController } = require('../../controllers');


const router = express.Router();
router.route('/add-user').post(userController.addUser);
router.route('/search/:email').get(userController.searchEmail);
module.exports = router; 