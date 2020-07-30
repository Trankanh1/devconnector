const express = require('express');
const router = express.Router();
const auth = require(appDir + '/src/middleware/auth');
const validator = require(appDir + '/src/validations/post');
const PostController = require(appDir + '/src/controllers/post');

/**
 * @route  POST api/posts
 * @desc   Add post
 * @access Private
 */
router.post('/',[auth, validator.createPost()], PostController.create);

/**
 * @route  GET api/posts
 * @desc   Get all posts
 * @access Private
 */
router.get('/',auth, PostController.getAll);

/**
 * @route  GET api/posts
 * @desc   Get post by Id
 * @access Private
 */
router.get('/:postId',auth, PostController.get);


/**
 * @route  DELETE api/posts/:postId
 * @desc   Delete post
 * @access Private
 */
router.delete('/:postId',auth, PostController.remove);

/**
 * @route  POST api/posts/reaction
 * @desc   React to a post
 * @access Private
 */
router.post('/reaction',[auth, validator.reaction()], PostController.reaction);

module.exports = router;