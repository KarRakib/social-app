"use client";

import Loader from "@/app/components/Loader";
import PostForm from "@/app/components/PostForm";
import { useUser } from "@clerk/nextjs";

import { useEffect, useState } from "react";

const CreatePost = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  console.log('post user', userData?._id);

  const postData = {
    creatorId: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <PostForm
        post={postData} apiEndpoint={"/api/post/add"}
      />
    </div>
  );
};

export default CreatePost;
