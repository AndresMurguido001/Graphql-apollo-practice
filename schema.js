export default `
type User {
  _id: String
  name: String!
  email: String!
  posts: [Post]
}
type Post {  
  title: String
  body: String
}
input PostInput {
  title: String
  body: String
  userId: String
}
type Query {
  getUser(_id: String): User
  allUsers: [User]
  getUserPosts(_id: String): [Post]
  getPost(userId: String, postId: String): [Post]
}
type Mutation {
  createUser(name: String, email: String, posts: PostInput): User
  createPost(title: String, body: String, _id: String): User
  updateUser(_id: String!, name: String, email: String): User
  updatePost(postId: String, post: PostInput): User
  deletePost(postId: String, _id: String): User
  deleteUser(_id: String): User
}
`
