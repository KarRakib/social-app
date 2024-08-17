const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        uinque: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        required: true,
      },
      posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
      },
      savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
      },
      likedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
      },
      followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
      },
      following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const PostSchema = new mongoose.Schema({
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    postPhoto: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    likes: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
  
export const SocialPost = mongoose.models.SocialPost || mongoose.model("SocialPost", PostSchema);

export const SocialUser = mongoose.models.SocialUser || mongoose.model('socialUser', UserSchema);
