const Subscription = {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterableIterator("count");
    },
  },

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
};

export { Subscription as default };
