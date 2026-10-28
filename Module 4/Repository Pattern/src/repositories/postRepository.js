
const postStore = require('../data/postStore');

// Map stores each post using its numeric ID as the key.
const posts = new Map(
  postStore.posts.map((post) => [post.id, { ...post }])
);

let nextId = postStore.nextId;

function findAll() {
  return Array.from(posts.values(), (post) => ({ ...post }));
}

function findById(id) {
  const post = posts.get(Number(id));
  return post ? { ...post } : null;
}

function create(fields) {
  const post = {
    id: nextId(),
    title: fields.title,
    body: fields.body || '',
    authorId: fields.authorId,
  };

  posts.set(post.id, post);
  return { ...post };
}

function update(id, patch) {
  const post = posts.get(Number(id));
  if (!post) return null;

  const updatedPost = {
    ...post,
    ...(patch.title !== undefined && { title: patch.title }),
    ...(patch.body !== undefined && { body: patch.body }),
  };

  posts.set(updatedPost.id, updatedPost);
  return { ...updatedPost };
}

function remove(id) {
  return posts.delete(Number(id));
}

// A future Prisma adapter can preserve this contract while adding async
// calls, client setup, schema/migrations, transactions, and integration tests.

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
