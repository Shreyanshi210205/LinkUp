"use client"
import ChatSidebar from '@/src/components/ChatSidebar'
import Loading from '@/src/components/Loading'
import { chat_service, useAppData, User } from '@/src/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'

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

  const handleLogout=()=>{
    logoutUser()
  }


  async function createChat(u:User) {
    const token=Cookies.get("token")
    try {
      const {data}=await axios.post(`${chat_service}/api/v1/chat/new`,{userId:loggedInUser?._id,otherUserId:u._id},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setSelectedUser(data.chatId)
      setShowAllUser(false)
      await fetchChats()
    } catch (error) {
      console.log(error)
      toast.error("Failed to start chat")
    }
  }

  useEffect(()=>{
    async function fetchChat() {
      const token=Cookies.get("token")
      try {
        const {data}=await axios.get(`${chat_service}/api/v1/message/:${selectedUser}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setMessages(data.messages);
        setUser(data.user)
        await fetchChats()
      } catch (error:unknown) {
        console.log(error)
        toast.error("Failed to load chat")
      }
    }

    if(selectedUser){
      fetchChat()
    }
  },[selectedUser, fetchChats])

  if(loading) return <Loading></Loading>
  return (
    <div className='min-h-screen flex bg-gray-900 text-white relative overflow-hidden'>

      <ChatSidebar 
      sidebarOpen={sidebarOpen} 
      setSidebarOpen={setSidebarOpen} 
      showAllUsers={showAllUser} 
      setShowAllUsers={setShowAllUser} 
      users={users} 
      loggedInUser={loggedInUser} 
      handleLogout={handleLogout} chats={chats} 
      selectedUser={selectedUser} 
      setSelectedUser={setSelectedUser} 
      createChat={createChat}>
      </ChatSidebar>
      <div className='flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border border-white/10 '>
      </div>
      
    </div>
  )
}

export default ChatApp
