import mongoose from 'mongoose';
import User from "./index";
import Post from "./index";

export default {
  Query: {
    getUser: async (parent, args, { User }) => {
      const user = await User.findById({_id: args._id})
      return user
    },
    allUsers: async (parent, args, { User }) => {
      let users = await User.find()
      return users.map((x) => {
        x._id = x._id.toString()
        return x
      })
    },
    getUserPosts: async (parent, args, { User }) => {
      let user = await User.findById({_id: args._id});
        return user.posts.map((x) => {
          return x
        })
    },
    getPost: async (paren, args, { User }) => {
      let user = await User.findById({_id: args.userId})
      return user.posts.filter((post) => {
        if (post.id == args.postId){
          return post
        }
      })
    }
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const newUser = await new User(args)
      newUser._id = new mongoose.Types.ObjectId()
      newUser.save()
      return newUser;
    },
    createPost: async (parent, args, { User }) => {
      let user = await User.findById({_id: args._id});
      let newPost = {
        _id: new mongoose.Types.ObjectId(),
        title: args.title,
        body: args.body
      }
      user.posts.unshift(newPost)
      user.save();
      return user
    },
    updateUser: async (parent, args, { User }) => {
      let user = await User.findById({_id: args._id})
      if (args.name !== undefined){
         user.name = args.name
      }
      if (args.email !== undefined){
         user.email = args.email
      }
      user.save();
      return user
    },
    updatePost: async (parent, args, { User }) => {
      try {
        let user = await User.findById({_id: args.post.userId})
        let posts = user.posts
        let newTitle = args.post.title;
        let newBody = args.post.body;
        posts.filter((post) => {
          if (post.id === args.postId){
            post.title = newTitle
            post.body = newBody
          }
        })
        user.save()
        return user
      } catch(e){
        console.log(e);
      }
    },
    deletePost: async ( parent, args, { User }) => {
      try {
        let user = await User.findById({_id: args._id})
        let posts = user.posts
        posts.filter((post) => {
          if (post.id === args.postId) {
            post.remove()
          }
        })
        user.save()
        return user
      } catch (e) {
        console.log(e);
      }
    },
    deleteUser: async ( parent, args, { User }) => {
      await User.findOneAndDelete({_id: args._id})
    }
  }
}
