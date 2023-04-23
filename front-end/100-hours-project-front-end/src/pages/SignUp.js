import React from 'react'
import {useState} from 'react' 
import { useNavigate } from "react-router-dom";


const SignUp = () =>{
const [ userName, setUserName] = useState('');
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')
const [confirmPassword , setConfirmPassword] = useState('')
const [message, setMessage] = useState('');
const navigate = useNavigate();


const handleSubmit = async (e) =>{
   e.preventDefault()
   const signUp = {userName,email,password,confirmPassword }
   const res = await fetch('/signup',{
        method:'POST',
        body:JSON.stringify(signUp),
        headers:{
          'Content-Type' : 'application/json'
        }
   })

   const json = await res.json()
   console.log(json)
   setMessage(json.message)

   if(json.error){
     console.log('error', json.message)
   }else{
     navigate("/login");
   }
  
}

  return(

      <>
      <div className="mt-10">
        <div className=" flex m-auto flex-col w-85 ">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900 text-center">Sign Up</h3>
            </div>
          </div>
          <div className="mt-5">
          <form className='form bg-white p-6 rounded-lg shadow-md w-5/6 max-w-[600px]' onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="">
                    <div className="mt-5 mx-auto w-9/12 ">
                      <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">
                        User Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="user-name"
                        autoComplete="given-name"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={e => setUserName(e.target.value)}
                      />
                    </div>

                    <div className="mt-5 mx-auto w-9/12">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                         Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mt-5 mx-auto w-9/12">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={e => setPassword(e.target.value)}
                      />
                      <p className='text-xs text-gray-500'>*Password must be at least 8 characters long</p>
                    </div>

                    <div className="mt-5 mx-auto w-9/12">
                      <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                  <button
                    type="submit"
                    className="btn btn-accent"
                  >
                    Submit
                  </button>
                  <p>{message}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
        </>

    )


}

export default SignUp