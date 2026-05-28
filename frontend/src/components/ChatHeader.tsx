import { Menu, UserCircle } from 'lucide-react'
import React from 'react'
import { User } from '../context/AppContext'

interface ChatHeaderProps{
    user:User |null
    setSidebarOpen:(open:boolean)=>void
    isTyping:boolean;

}

const ChatHeader = ({user,setSidebarOpen,isTyping}:ChatHeaderProps) => {
  return (
    <>
      {/* mobile menu toggle button for side bar open */}
      <div className='sm:hidden fixed top-4 right-4 z-30'>
        <button onClick={()=>setSidebarOpen(true)} className='p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'>
            <Menu className='w-5 h-5 text-gray-200'/>
        </button>
      </div>

      {/* chat part */}
      <div className='mb-6 bg-gray-800 rounded-lg border border-gray-700 p-6'>
        <div className='flex items-center gap-4'>
            {
                user?(
                    <>
                    <div className='relative'>
                        <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'>
                            <UserCircle className='h-8 w-8 text-gray-300'></UserCircle>

                        </div>
                        {/* online user or not */}
                    </div>
                    {/* user information here */}
                    <div className='flex-1 min-w-0 '>
                        <div className='flex items-center gap-3 mb-1'>
                            <h2 className='text-2xl font-bold text-white truncate'>
                                {user.name}
                            </h2>
                        </div>
                    </div>

                    {/* typing status */}

                    </>
                ):(
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'>
                            <UserCircle className='h-8 w-8 text-gray-300' ></UserCircle>
                        </div>
                        <h2 className='text-2xl font-bold text-gray-400'>
                            Select a converstation
                        </h2>
                        <p className='text-sm text-gray-50 mt-1'>Choose a chat from the sidebar to start messaging </p>
                    </div>
                )
                
            }
        </div>
      </div>
    </>
  )
}

export default ChatHeader
