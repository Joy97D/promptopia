'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data:session } = useSession();
  const [providers, setproviders]=useState(null)
  const [ToggleDropDown, setToggleDropDown]=useState(false)

  useEffect(()=>{
    const setUpProviders= async ()=>{
        const response =await getProviders();
        setproviders(response)
    }
    setUpProviders();
    // console.log(providers)
  })
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2">
            <Image src="/assets/images/logo.svg" width={30} height={30} className="objext-contain"/>
            <p className="logo_text">Promptopia</p>
        </Link>
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
           {session?.user ? (
            <div className="flex gap-3 md:gap-5">
               <Link href="/create-prompt" className="black_btn">
                Create post
               </Link>
               <button type="button" onClick={signOut} className="outline_btn">
                 Sign Out
               </button>
               <Link href={`/profile?id=${session?.user.id}`}>
                <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="Profile">

                </Image>
               </Link>
            </div>
           ):(
            <>
            {providers
             && Object.values(providers).map((provider)=>(
              <button 
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            ))}
            </>
           )
        }
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
               <div className="flex">
                 <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="Profile" onClick={()=>{setToggleDropDown((prev)=> !prev)}}></Image>
            {ToggleDropDown &&(
                <div className="dropdown">
                    <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                        My Profile
                    </Link> 
                    <Link href="/create-prompt" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                        Create Prompt
                    </Link> 
                    <button type="button" onClick={()=>{
                        setToggleDropDown(false)
                        signOut();
                    }}
                    className="mt-5 black_btn w-full"
                    >
                       Sign Out
                    </button>
                </div>
               )}
               </div>
            ):(
                <>
                 {providers
             && Object.values(providers).map((provider)=>(
              <button 
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            ))}
            </>
            )}
        </div>
        {/* <div>
            {ToggleDropDown &&(
                <button> Toggle</button>
            )}
        </div> */}
    </nav>
  )
}

export default Nav