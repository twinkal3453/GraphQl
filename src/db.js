const comments = [
  {
    id: "111",
    comment: "This is the best book that I've read",
    author: "3",
    post: "11",
  },
  {
    id: "112",
    comment: "I'm the single who read this.",
    author: "2",
    post: "11",
  },
  {
    id: "113",
    comment: "This is too good to be true",
    author: "1",
    post: "11",
  },
  {
    id: "114",
    comment: "this is Nice",
    author: "1",
    post: "12",
  },
  {
    id: "115",
    comment: "Awesome documentry",
    author: "2",
    post: "12",
  },
  {
    id: "116",
    comment: "Good Novel, It blows my mind.",
    author: "3",
    post: "11",
  },
  {
    id: "117",
    comment: "This is what I'm looking for.",
    author: "2",
    post: "12",
  },
];

const users = [
  {
    id: "1",
    name: "Twinkal Raj",
    email: "twinkal@gmail.com",
    age: 26,
  },
  {
    id: "2",
    name: "Prince Raj",
    email: "prince@gmail.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@gmail.com",
  },
];

const posts = [
  {
    id: "11",
    title: "the Janosice",
    body: "This is a big topic to discuss",
    published: true,
    author: "3",
  },
  {
    id: "12",
    title: "the Child Labour",
    body: "The body will come soon! stay tuned.",
    published: false,
    author: "3",
  },
  {
    id: "13",
    title: "the Bed of Roses",
    body: "this topic is about a person who naver live in proverty and one day he and his family got bankrupt then this story describe his after life",
    published: true,
    author: "2",
  },
];

const db = { users, posts, comments };

export { db as default };
