'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { id } = useParams();
    console.log('posts', id);
    
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState([]);

    const getUser = async () => {
        const res = await axios.get(`/api/user/profile/${id}`)
        console.log('profile',res.data);

    }
   React.useEffect(() => {
      getUser();
  
    }, [id])
    
    return (
        <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Posts" />

      <div className="flex flex-col gap-9">
        {userData?.posts?.map((post) => (
          <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user} update={getUser}/>
        ))}
      </div>
    </div>
    )
}

export default page