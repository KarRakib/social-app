import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models";

export const GET = async (req,{params})=>{
    try {
        await connectDB();
const user = await SocialUsers.findById(params.profileId)
.populate({
    path: "posts savedPosts likedPosts",
    model: SocialPosts,
    populate: {
      path: "creator",
      model: SocialUsers,
    },
  })
  .populate({
    path: "followers following",
    model: SocialUsers,
    populate: {
      path: "posts savedPosts likedPosts",
      model: SocialPosts,
    },
  })
  .exec();
  return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('error ', { status: 200 });
    }
}