import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) {
      throw new Error("Email taken.");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error("User Not find to delete.");
    }

    // finding the index of the user that we're going to delete.
    const deletedUsers = db.users.splice(userIndex, 1);

    // deleting the user post and their related comment when the user deletes.
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        // deleting the comment that is belong to that
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }

      // deleting the comments which are belongs to the user
      db.comments = db.comments.filter((comment) => comment.author !== args.id);

      return !match;
    });

    return deletedUsers[0];
  },

  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === args.id);

    if (!user) {
      throw new Error("User Not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email in use!");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },

  createPost(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);

    if (!userExist) {
      throw new Error("User Not found!");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    return post;
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error("Post is not exist.");
    }

    // finding the index of the user that we're going to delete.
    const deletedPost = db.posts.splice(postIndex, 1);

    // deleting the comments that are belongs to that post.
    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    return deletedPost[0];
  },

  createComment(parent, args, { db, pubsub }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    const postExist = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );

    if (!userExist || !postExist) {
      throw new Error("May be user and Post not exist.");
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    // Once the comment is created then it will publish
    // the comment to get the comment instantly without
    // api call via graphql subscription.
    pubsub.publish(`comment ${args.data.post}`, { comment });
    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found!");
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },
};

export { Mutation as default };
