"use client"
import Loading from '@/src/components/Loading'
import { useAppData, User } from '@/src/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface Message{
  _id:string;
  chatId:string;
  senderId:string;
  text?:string;
  image?:{
    url:string;
    publicId:string
  };
  messageType:"text" |"image"
  seen:boolean;
  seenAt?:string;
  createdAt:string
}

const ChatApp = () => {
  const {loading,isAuth,logoutUser,chats,user:loggedInUser,users,fetchChats,setChats}=useAppData()

  const [selectedUser,setSelectedUser]=useState<string|null>(null)
  const [message,setMessage]=useState("")
  const [sidebarOpen,setSidebarOpen]=useState(false)
  const [messages,setMessages]=useState<Message[]|null>(null)
  const [user,setUser]=useState<User|null>(null);//with whom we are chatting right now
  const[showAllUser,setShowAllUser]=useState(false)
  const [isTyping,setIsTyping]=useState(false)//for indicator of typing
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout| null>(null)
  


  const router =useRouter()

  useEffect(()=>{
    if(!isAuth && !loading) router.push("/login")
  },[isAuth,router,loading])

  if(loading) return <Loading></Loading>
  return (
    <div className='min-h-screen flex bg-gray-900 text-white relative overflow-hidden'>

      Chatapp
      
    </div>
  )
}

export default ChatApp
