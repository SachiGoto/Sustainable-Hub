import React from 'react'
import {useState} from 'react' 
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const navigate = useNavigate();
    // const [ userName, setUserName] = useState('');
    const [ email, setEmail] = useState('');
    const [password , setPassword] = useState('')

    //const [message, setMessage] = useState('');

    const handleSubmit = async(e) =>{
         e.preventDefault()

        //  const loginForm = {userName, password}
        const loginForm = {email, password}
        //  console.log('login form is ' , loginForm)

         const res = await fetch('/login',{
            method:'POST',
            body:JSON.stringify(loginForm),
            headers:{
                'Content-Type' : 'application/json'
              }



         })

  

         const json = await res.json()

         console.log('log in ', json)

         if(!res.ok){
          console.log("!res.ok " , res.ok)
         }else{
          if(json.login){
              
               navigate("/profile");
               console.log('You are logged in.')
          }else{
            console.log('login failed')
          }
         
         }

        //  if(!res.ok){
        //     console.log('error', json)
        //  }else{
        //   navigate("/profile");
        //     console.log('successs')
        //     console.log( json)
        //  }

         

         
         //const logIn = {userName, password}


    }


// console.log('user name: ' , userName, " , password : ", password)
// console.log('email: ' , email, " , password : ", password)



    return(
        <>

<div className="mt-10 sm:mt-0">
        <div className=" flex m-auto flex-col w-85 ">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900 text-center">Login Page</h3>
            </div>
          </div>

<form className='form bg-white p-6 rounded-lg shadow-md w-5/6' onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="">
                    <div className="mt-5 mx-auto w-9/12 ">
                      {/* <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">
                        User Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="user-name"
                        autoComplete="given-name"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        onChange={e => setUserName(e.target.value)}
                      /> */}

                      <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="user-name"
                        autoComplete="given-name"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
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
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // onChange={handleChange}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>


                   

                   

                   
                  </div>
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Submit
                  </button>
                  {/* <p>{message}</p> */}

                
                </div>
              </div>
            </form>
</div>
</div>
        </>
    )


}

export default Login 