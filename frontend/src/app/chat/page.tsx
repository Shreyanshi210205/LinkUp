"use client"
import Loading from '@/src/components/Loading'
import { useAppData } from '@/src/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatApp = () => {
  const {loading,isAuth}=useAppData()
  const router =useRouter()

  useEffect(()=>{
    if(!isAuth && !loading) router.push("/login")
  },[isAuth,router,loading])

  if(loading) return <Loading></Loading>
  return (
    <div>
      
    </div>
  )
}

export default ChatApp
