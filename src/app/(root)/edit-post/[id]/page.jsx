'use client'

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


    return(
        <>
        Edit form
        </>
    )
}

export default EditPost