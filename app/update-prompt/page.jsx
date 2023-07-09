'use client';

import { useState,useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router=useRouter()
    // const { data:session }=useSession()
    const searchparams=useSearchParams();
    const promptid=searchparams.get('id')
    const [submitting,setsubmitting]=useState(false)
    const [post,setpost]=useState({
        prompt:'',
        tag:'',
    });
    useEffect(()=>{
      const getPromptDetails=async ()=>{
        const response= await fetch(`/api/prompt/${promptid}`)
        const data=await response.json()
        setpost({
            prompt:data.prompt,
            tag:data.tag,
        })
      }
      if(promptid) getPromptDetails()
    },[promptid])
    const updatePrompt =async(e)=>{
      e.preventDefault();
      setsubmitting(true)
      if(!promptid) return alert('Prompt ID not found')
      try {
        const response=await fetch(`/api/prompt/${promptid}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
          })
        }
        )
        if(response.ok){
            router.push('/');
        }
      } catch (error) {
        console.log(error)
      }
        finally{
          setsubmitting(false)
        }
    }
  return (
    <Form
    type="Edit"
    post={post}
    submitting={submitting}
    setpost={setpost}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt