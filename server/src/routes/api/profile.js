const express = require('express');
const router = express.Router();
const auth = require(appDir + '/src/middleware/auth');
const validator = require(appDir + '/src/validations/profile');
const ProfileController = require(appDir + '/src/controllers/profile');

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
router.post('/', [auth, validator.createOrUpdate()], ProfileController.createOrUpdate);

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

/**
 * @route  DELETE api/profile
 * 
 * @desc   Delete user profile
 * @access Private
 */
router.delete('/', auth, ProfileController.remove);

/**
 * @route  PUT api/profile/experience
 * @desc   Add profile experience
 * @access Private
 */
router.put('/experience', [auth, validator.addExperience()], ProfileController.addExperience);

/**
 * @route  DELETE api/profile/experience/:expId
 * @desc   Delete experience from profile
 * @access Private
 */
router.delete('/experience/:expId', auth, ProfileController.removeExperience);

/**
 * @route  PUT api/profile/education
 * @desc   Add education
 * @access Private
 */
router.put('/education', [auth, validator.addEducation()], ProfileController.addEducation);

/**
 * @route  DELETE api/profile/education
 * @desc   Delete education
 * @access Private
 */
router.delete('/education/:eduId', auth, ProfileController.removeEducation);

/**
 * @route  GET api/profile/github/:username
 * @desc   Get user repos from github
 * @access Public
 */
router.get('/github/:username', ProfileController.getGithubRepos);




module.exports = router;