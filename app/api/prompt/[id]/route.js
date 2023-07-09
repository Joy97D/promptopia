import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
// Get Request to get the post

export const GET = async (request,{params})=>{
  try {
    await connectToDB()
    const prompt=await Prompt.findById(params.id).populate('creator')
    if(!prompt){
        return new Response("Prompt not found",{status:404})
    }
    return new Response(JSON.stringify(prompt),{status:200})
  } catch (error) {
    return new Response("Failed to fetch prompts",{status:500})
  }
}

// Patch to edit the fetched post
export const PATCH = async(request,{params})=>{
    const {prompt,tag}=await request.json();
    try {
        await connectToDB();
        const existingprompt=await Prompt.findById(params.id);
        if(!existingprompt){
            return new Response("Prompt not found",{status:404})
        }
        existingprompt.prompt=prompt
        existingprompt.tag=tag
        await existingprompt.save()
        return new Response(JSON.stringify(existingprompt),{status:200})
    } catch (error) {
        return new Response("Failed to update prompt",{status:500})
    }
}

//Delete to delete the post
export const DELETE=async(request,{params})=>{
    try {
        await connectToDB()
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt Deleted succesfully",{status:200})
    } catch (error) {
        return new Response("Failed to delete prompt",{status:500})
    }
}