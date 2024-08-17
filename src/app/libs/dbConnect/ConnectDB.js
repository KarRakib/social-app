import mongoose from "mongoose";

export  const dBConnect = async () =>{
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGOOSE_URL );
    } catch (error) {
        console.log('error from mongoose connect ', error);
        
    }
}