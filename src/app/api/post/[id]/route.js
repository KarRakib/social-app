import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models";

export const GET = async(req,{params})=>{
try {
    await connectDB();

    const post = await SocialPosts.findById(params.id)
      .populate("creator likes")
      .exec();
                              
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Fail to get post by id", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();

  try {
    await connectDB();

    const data = await req.formData();

    let postPhoto = data.get("postPhoto");

    if (typeof postPhoto !== "string") {
      const bytes = await postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const postPhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        postPhoto.name
      );

      await writeFile(postPhotoPath, buffer);

      postPhoto = `/uploads/${postPhoto.name}`;
    }

    const post = await SocialPosts.findByIdAndUpdate(
      params.id,
      {
        $set: {
          caption: data.get("caption"),
          tag: data.get("tag"),
          postPhoto: postPhoto,
        },
      },
      { new: true, useFindAndModify: false }
    );

    await post.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update the post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
    try {
      await connectDB();
  
      await SocialPosts.findByIdAndDelete(params.id);
  
      const user = await SocialUsers.findByIdAndUpdate(
        params.creatorId,
        { $pull: { posts: params.id } },
        { new: true, useFindAndModify: false }
      )
        .populate("posts savedPosts likedPosts followers following")
        .exec();
  
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Failed to delete the post", { status: 500 });
    }
  };
