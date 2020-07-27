const express = require('express');
const router = express.Router();
const auth = require(appDir+'/src/middleware/auth');
const validator = require(appDir + '/src/validations/profile');

const ProfileController = require(appDir+'/src/controllers/profile');

/**
 * @route  GET api/profile/me
 * @desc   Get current user profle
 * @access Private
 */
router.get('/me', auth, ProfileController.me);

/**
 * @route  POST api/profle
 * @desc   Create or update user profle
 * @access Private
 */
router.post('/',[auth, validator.createOrUpdate()], ProfileController.createOrUpdate);

/**
 * @route  GET api/profile
 * @desc   Get all profiles
 * @access Public
 */
router.get('/', ProfileController.getAll);

/**
 * @route  GET api/profile/user/:userId
 * @desc   Get profile by user ID
 * @access public
 */
router.get('/user/:userId', ProfileController.getByUserId);

module.exports = router;