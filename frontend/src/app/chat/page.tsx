"use client"
import ChatSidebar from '@/src/components/ChatSidebar'
import Loading from '@/src/components/Loading'
import { chat_service, useAppData, User } from '@/src/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'
import ChatHeader from '@/src/components/ChatHeader'
import ChatMessages from '@/src/components/ChatMessages'
import MessageInput from '@/src/components/MessageInput'
import { SocketData } from '@/src/context/SocketContext'

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
  const {loading,isAuth,logoutUser,chats,user:loggedInUser,users,fetchChats}=useAppData()
  const {onlineUsers,socket} =SocketData()
  // console.log(onlineUsers)

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessageSend=async(e:any,imageFile?:File|null)=>{
    e.preventDefault()

    if(!message.trim() && !imageFile) return
    if(!selectedUser) return

    if(typingTimeout) {
      clearTimeout(typingTimeout)
      setTypingTimeout(null)
    }
    socket?.emit("stopTyping",{
      chatId:selectedUser,
      userId:loggedInUser?._id
    })
    

    const token=Cookies.get("token")
    try {
      const formData=new FormData()

      formData.append("chatId",selectedUser)

      if(message.trim()){
        formData.append("text",message)
      }

      if(imageFile){
        formData.append("image",imageFile)
      }

      const {data}=await axios.post(`${chat_service}/api/v1/message`,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        },
      })
      setMessages((prev)=>{
        const currentMessages=prev|| [];
        const messageExists =currentMessages.some(
          (msg)=>msg._id===data.message._id
        );
        if(!messageExists){
          return [...currentMessages,data.message]
        }
        return currentMessages
    });

    setMessage("")
    const displayText=imageFile?"📷 image":message
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to send message");
      } else {
        toast.error("Failed to send message");
      }
    }
  }

  const handleTyping=(value:string)=>{
    setMessage(value)
    if(!selectedUser || !socket) return
    if(value.trim()){
      socket?.emit("typing",{
        chatId:selectedUser,
        userId:loggedInUser?._id
      })
    }

    if(typingTimeout){
      clearTimeout(typingTimeout)
    }
    const timeout=setTimeout(()=>{
      socket.emit("stopTyping",{
        chatId:selectedUser,
        userId:loggedInUser?._id
      })
    },2000)
    setTypingTimeout(timeout)
  }

  useEffect(()=>{
    socket?.on("userTyping",(data)=>{
      console.log(`Received user typing`,data)
      if(data.chatId===selectedUser && data.userId!==loggedInUser) 
        setIsTyping(true)
    })

    socket?.on("userStoppedTyping",(data)=>{
      console.log(`Received user stopped typing`,data)
      if(data.chatId===selectedUser && data.userId!==loggedInUser) 
        setIsTyping(false)
    })

    return ()=>{
      socket?.off("userTyping")
      socket?.off("userStoppedTyping")
    }
  },[socket,selectedUser,loggedInUser])

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
      setIsTyping(false)

      socket?.emit("joinChat",selectedUser)

      return ()=>{
        socket?.emit("leaveChat",selectedUser)
        setMessages(null)
      }
    }
  },[selectedUser, fetchChats,socket])

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
      createChat={createChat}
      onlineUsers={onlineUsers}>

      </ChatSidebar>
      <div className='flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border border-white/10 '>

      <ChatHeader 
      user={user}
      setSidebarOpen={setSidebarOpen}
      isTyping={isTyping}
      onlineUsers={onlineUsers}
      />

      <ChatMessages selectedUser={selectedUser} messages={messages} loggedInUser={loggedInUser}/>

      <MessageInput selectedUser={selectedUser} message={message} setMessage={handleTyping} handleMessageSend={handleMessageSend} ></MessageInput>
      </div>
      
    </div>
  )
}

export default ChatApp
