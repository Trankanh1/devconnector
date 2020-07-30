const express = require('express');
const router = express.Router();
const auth = require(appDir + '/src/middleware/auth');
const validator = require(appDir + '/src/validations/comment');
const CommentController = require(appDir + '/src/controllers/comment');

/**
 * @route  POST api/posts/comment
 * @desc   Create comment
 * @access Private
 */
router.post('/', [auth, validator.postComment()], CommentController.postComment);

/**
 * @route  PUT api/comments
 * @desc   Edit comment
 * @access Private
 */
router.put('/', [auth, validator.editComment()], CommentController.editComment);

/**
 * @route  PUT api/comments
 * @desc   Load comment
 * @access Private
 */
router.get('/', auth, CommentController.loadComment);

/**
 * @route  PUT api/comments
 * @desc   Delete comment
 * @access Private
 */
router.delete('/', auth, CommentController.removeComment);


module.exports = router;