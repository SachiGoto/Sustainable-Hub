import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser, userId, setUserId }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginForm = { email, password };
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    setMessage(json);
    if (!res.ok) {
    } else {
      console.log("what is in json?", json);
      if (json.login) {
        setUser(json.user.userName);
        setUserId(json.user._id);
        navigate("/main2");
        console.log("You are logged in.");
      } else {
        console.log("message ", json);
      }
    }
  };

  return (
    <>
      <div className="mt-10">
        <div className="flex m-auto flex-col w-85">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-[1.3rem] font-semibold leading-6 text-gray-900 text-center">
                Login
              </h3>
            </div>
          </div>
          <div className="mt-5">
            <form
              className="form bg-white p-6 rounded-lg shadow-md w-5/6 max-w-[600px]"
              onSubmit={handleSubmit}
            >
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="">
                    <div className="mt-5 mx-auto w-9/12 ">
                      <label
                        htmlFor="user-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="user-name"
                        autoComplete="given-name"
                        className="pl-2 mt-2 block w-full rounded-md border-1 py-1.5 ring-gray-300 text-gray-900 shadow-sm ring-1 sm:text-sm sm:leading-6"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mt-5 mx-auto w-9/12">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 sm:text-sm sm:leading-6"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                  <button
                    type="submit"
                    className="btn btn-secondary py-2 px-3 mb-[2%]"
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
  );
};

export default Login;
