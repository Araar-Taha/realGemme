const posts = [];

module.exports = {
  getPosts: () => posts,
  createPost: ({ title, content, author }) => {
    const post = {
      id: String(posts.length + 1),
      title,
      content,
      author,
    };
    posts.push(post);
    return post;
  },
};
