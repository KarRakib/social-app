
import connectDB from "@/app/libs/ConnectDB";
import { SocialPost, SocialUsers } from "@/app/libs/Models/models"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const user = await SocialUsers.findOne({ clerkId: params.id })
            .populate('followers following')
            .exec();

        //     {path: "posts savePosts likedPosts",
        //     model: SocialPost,
        //     populate: {
        //         path: 'creator',
        //         model: SocialUser,
        //     },
        // })
        //     .populate({
        //         path: "posts savePosts likedPosts",
        //         model: SocialUser,
        //         populate: {
        //             path: 'creator',
        //             model: SocialPost,
        //         },
        //     }).exec()
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to get user', { status: 500 });
    }
};
