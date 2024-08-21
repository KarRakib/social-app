'use server'
import connectDB from "../dbConnect/ConnectDB";
import { SocialUser } from "../Models/models";


export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  console.log('user last ' ,id, first_name);
  
  try {
    await connectDB();

    const user = await SocialUser.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true } // if user doesn't exist, create a new one
    );

    console.log('User created or updated:', user);
    return user;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error; // Rethrow error so it can be handled upstream
  }
};

export const deleteUser = async (id) => {
  try {
    await connectDB();
    await SocialUser.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error(error);
  }
};
