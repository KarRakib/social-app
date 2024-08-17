import { dBConnect } from "../dbConnect/ConnectDB";
import { SocialUser } from "../Models/models";

export const createOrUpdateUser = async (
    id, first_name,last_name,image_url,email_addresses,username
)=>{
    try {
        await dBConnect();
        const user = await SocialUser.findOneAndUpdate({clerkId:id},
            {
                $set:{
                    firstName: first_name,
                    lastName: last_name,
                    profilePhoto: image_url,
                    email: email_addresses[0].email_address,
                    username: username,
                },
            },
            {upsert:true , new:true}
        );
        await user.save()
        return user
    } catch (error) {
        console.log('error form user Actions', error);
        
    }
};
export const deleteUser = async(id)=>{
    try {
        await dBConnect();
        await SocialUser.findByIdAndDelete({clerkId:id})
    } catch (error) {
        console.log('error user action delete', error);
        
    }
}