'use client'

import Posting from "@/app/components/Posting";

const { useParams } = require("next/navigation");
const { useState, useEffect } = require("react");

const EditPost = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [editPost, setEditPost] = useState({});

    const getEditPost = async () => {
        const res = await fetch(`/api/post/${id}`, {
            method: 'GET', headers: {
                'Content-Type': 'apllication/json'
            }
        })
        const data = await res.json();
        console.log(data);
        setEditPost(data)
        setLoading(false)

    }
    useEffect(() => {
        getEditPost()
    }, [id])

    const postInfo = {
        creatorId: postData?.creator?._id,
        caption: postData?.caption,
        tag: postData?.tag,
        postPhoto: postData?.postPhoto,
      }
    
    return loading ? (
        <Loader />
      ) : (
        <div className="pt-6">
          <Posting post={postInfo} apiEndpoint={`/api/post/${id}`}/>
        </div>
      );
    };

export default EditPost