"use client"
import { ArrowRight, Loader2Icon, LockIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const VerifyPage = () => {
  const [loading,setLoading]=useState(false)
  const [otp,setOtp]=useState<string[]>(["","","","","",""])
  const [error,setError]=useState<string>("")
  const [resendLoading,setResendLoading]=useState<boolean>(false)
  const [timer,setTimer]=useState(60);
  const inputRefs=useRef<Array<HTMLInputElement> >([])
  const router=useRouter()

      const searchParams=useSearchParams()
      const email:string=searchParams.get("email") || ""
      const handleSubmit=async(e:React.SubmitEvent<HTMLFormElement>)=>{
          e.preventDefault();
          const otpString=otp.join("")
          if(otpString.length!=6 ) setError("Please enter all 6 digitd")
            return
      }
      const handleInputChange=(index:number,value:string):void=>{
        if(value.length>1) return;
        const newOtp=[...otp]
        newOtp[index]=value;
        setOtp(newOtp)
        setError("")

        if(value && index<5){
          inputRefs.current[index+1]?.focus()
        }
      }
      const handleKeyDown=(index:number,e:React.KeyboardEvent<HTMLElement>):void=>{
        if(e.key==="Backspace" && !otp[index] && index>0){
          inputRefs.current[index-1]?.focus()
        }
      }
      const handlePaste=(e:React.ClipboardEvent<HTMLElement>):void=>{
        e.preventDefault()
        const pastedData=e.clipboardData.getData("text")
        const digits= pastedData.replace(/\D/g,"").slice(0,6)
        if(digits.length==6){
          const newOtp=digits.split("")
          setOtp(newOtp)
          inputRefs.current[5]?.focus()
        }

      }
      useEffect(()=>{
        if(timer>0){
            const interval=setInterval(() => {
                setTimer((prev)=>prev-1)
            }, 1000);
            return ()=>clearInterval(interval)
        }
      },[timer])

      console.log(timer)
      return (
      <div>
        <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
        <div className='max-w-md w-full '>
          <div className='bg-gray-800 border border-gray-700 rounded lg p-8'>
              <div className='text-center mb-8'>
                  <div className='mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6'>
                      <LockIcon size={40} className='text-white'/>
                  </div>
                  <h1 className='text-4xl font-bold text-white mb-3'>
                    Verify Your Email
                  </h1>
                  <div className='text-gray-300 text-lg'> We have sent a 6-digit code to 
                  <div className='text-blue-400 font-medium'>{ email}</div>
                  </div>
              </div>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label  className='block text-sm font-medium text-gray-300 mb-4 text-center'>Enter your 6-digit otp here</label>
                  <div className='flex justify-center in-checked:space-x-3'>
                    {
                      otp.map((digit,index)=>(
                        <input key={index} ref={(el:HTMLInputElement)=>{
                          inputRefs.current[index]=el;
                        }} 
                        type='text' 
                        maxLength={1}
                        value={digit}
                        onChange={e=>handleInputChange(index,e.target.value)}
                        onKeyDown={e=>handleKeyDown(index,e)}
                        onPaste={index===0?handlePaste:undefined}
                        className='m-0.5 w-12 h-12 text-center text-xl font-bold  border-2 border-gray-600 rounded-lg bg-gray-700 text-white'/>
                      ))
                    }
                  </div>
                  
                </div>
                {
                  error && <div className='bg-red border border-red-700 rounded-lg p-3 '>
                    <p className='text-red-300 text-sm text-center'>{error}</p>
                  </div>
                }
                <button  type='submit' className='w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer disbaled:opacity-50 disabled:cursor-not-allowed
                disabled={loading}'>
                  {
                    loading?(<div className='flex items-center justify-center gap-2'>
                      <Loader2Icon className='w-5 h-5'/>
                      Verifying...
                    </div>):(<div className='flex items-center justify-center gap-2'>
                    <span>Verify</span>
                    <ArrowRight className='w-5 h-5'/>
                  </div>)
                  }
                  
                </button>
              </form>
              <div className='mt-6 text-center '>
                <p className='text-gray-400 text-sm mb-4'>Didn&#39t receive the code?</p>
                {
                  timer >0 ? <p className=''></p> : <button className='text-blue-500 hover:text-blue-300 font-medium text-sm disabled:opacity-50' disabled={resendLoading}>{resendLoading? "Sending...": "Resend OTP"}</button>
                }
              </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default VerifyPage
