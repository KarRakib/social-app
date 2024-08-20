import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: true },
  postPhoto: { type: String, required: true },
  tag: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export const SocialUser = mongoose.models.SocialUser || mongoose.model('SocialUser', UserSchema);
export const SocialPost = mongoose.models.SocialPost || mongoose.model('SocialPost', PostSchema);
