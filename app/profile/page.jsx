"use client"

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'

import Profile from "@components/profile"

const Profile2 = () => {
  const router=useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  // const { data:session }=useSession()
  const [creatorid, setcreatorid] = useState(id)
  const [posts, setposts] = useState([])
  const [profilename, setprofilename] = useState('')
  const handleEdit=(post)=>{
   router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete=async (post)=>{
   const hasconfirmed = confirm("Are you sure you want to delete this prompt?");
   if(hasconfirmed){
    try {
      await fetch(`/api/prompt/${post._id.toString()}`,{
        method:'DELETE'
      })
      const filteredpost=posts.filter((p)=>{
        p._id !== post._id});
        setposts(filteredpost)
        // console.log(filteredpost)
    } catch (error) {
      console.log(error)
    }
   }
  }
  const fetchPosts=async ()=>{
    const response= await fetch(`/api/users/${creatorid}/posts`);
    const data= await response.json();
    setposts(data)
    if(data){
    setprofilename(data[0].creator.username)
    }
   }
  useEffect(()=>{
    if(creatorid)
    {fetchPosts();}
  },[])
  return (
        <Profile
        name={profilename}
        desc="Welcome to your personalized page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
  )}
export default Profile2