const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { db, pubsub }, info) => {
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error("Post not found!");
      }

      return pubsub.asyncIterableIterator(`comment ${postId}`);
    },
  },

  post: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterableIterator("post");
    },
  },
};

export { Subscription as default };
