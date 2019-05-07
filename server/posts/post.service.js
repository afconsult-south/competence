const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Post = db.Post;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Post.find().select();
}

async function getById(id) {
    return await Post.findById(id).select();
}

async function create (postParam) {

    post = new Post(postParam);
    // save Post
    await post.save();
}

async function update(id, PostParam) {
    const Post = await Post.findById(id);

    // copy PostParam properties to Post
    Object.assign(Post, PostParam);

    await Post.save();
}

async function _delete(id) {
    await Post.findByIdAndRemove(id);
}