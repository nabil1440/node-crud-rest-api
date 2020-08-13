const express = require('express');
const router = express.Router();
// Import Schema
const Post = require('../models/Post');

router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post('/', async (req, res) => {
	const newPost = new Post({
		title: req.body.title,
		body: req.body.body
	});
	try {
		const savedPost = await newPost.save();
		res.json(savedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get('/:postId', async (req, res) => {
	try {
		const onePost = await Post.findById(req.params.postId);
		res.json(onePost);
	} catch (err) {
		res.json({ message: err });
	}
});

router.delete('/:postId', async (req, res) => {
	try {
		const deletePost = await Post.deleteOne({ _id: req.params.postId });
		res.json(deletePost);
	} catch (err) {
		res.json({ message: err });
	}
});

router.patch('/:postId', async (req, res) => {
	try {
		const updatedPost = await Post.updateOne(
			{ _id: req.params.postId },
			{ $set: { body: req.body.body } }
		);
		res.json(updatedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
