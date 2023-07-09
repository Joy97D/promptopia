"use client"

import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList=({ data, handleTagClick })=>{
  // console.log(data)
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText,setsearchText]=useState('')
  const [posts,setposts]=useState([])
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setsearchText(e.target.value)
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterposts(e.target.value);
        setSearchedResults(searchResult);
      }, 1500)
    );
  }
  const filterposts=(searchText)=>{
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    // console.log('send',filteredposts)
    // setsendposts(filteredposts)
  }
  const handleClick=(tag)=>{
     setsearchText(tag)
     const searchResult = filterposts(tag);
     setSearchedResults(searchResult);
  }
  const fetchPosts=async ()=>{
    const response= await fetch('/api/prompt');
    const data= await response.json();
    setposts(data)
   }
  useEffect(()=>{
     fetchPosts();
  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required
        // onBlur={()=>{setposts(posts)}}
        className="search_input peer"
        >
        </input>
      </form>
      {searchText?(
         <PromptCardList
         data={searchedResults}
         handleTagClick={handleClick}
       />
       ):(
        <PromptCardList data={posts} handleTagClick={handleClick}/>
       )
      }
    </section>
  )
}

export default Feed