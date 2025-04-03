const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((item) =>
      item.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter((item) => {
      return (
        item.title.toLowerCase().includes(args.query.toLowerCase()) ||
        item.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },

  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
    return db.comments.filter((item) => {
      return item.comment.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  me() {
    return {
      id: 12312,
      name: "Twinkal Raj",
      email: "twinkal@gmail.com",
      age: 23,
    };
  },

  post() {
    return {
      id: 123,
      title: "The Janoside.",
      body: "This is the big topic to discuss on.",
      published: true,
    };
  },
};

export { Query as default };
