const Subscription = {
  count: {
    subscribe: (parent, args, { pubSub }) => {
      let count = 0;
      setInterval(() => {
        count++;
        pubSub.publish("count", { count }); // ✅ correct format
      }, 1000);

      return pubSub.subscribe("count"); // ✅ Yoga uses .subscribe(), not asyncIterator
    },
    resolve: (payload) => payload.count, // ✅ Return the actual count value
  },

  comment: {
    subscribe: (parent, { postId }, { db, pubSub }, info) => {
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error("Post not found!");
      }

      return pubSub.subscribe(`comment ${postId}`);
    },
    resolve: (payload) => {
      console.log("payload: ", payload);
      return payload.comment;
    },
  },
};

export { Subscription as default };
