import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import { NotEqualStencilFunc } from "three";
//import { useNavigate } from "react-router-dom";

function App() {
  const [allData, setAllData] = useState(null);
  const [user, setUser] = useState({ userName: null });
  const [userId, setUserId] = useState({userid:null})

  //const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch("/list");
      const json = await response.json();

      if (response.ok) {
        setAllData(json);
      }
    };
    fetchAllData();
  }, []);

  // useEffect(()=>{
  //   async function getData() {
  //     const getData = await fetch("/login");
  //     const response = await getData;
  //     const resJson = await response.json();
  //     if (!resJson.login) navigate("/");
  //     setUser({userName : resJson.user.userName})
  //   }

  //   getData();
  // },[setUser,  navigate])



  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="main" element={<Main categoryData={allData}  userId={userId.userId} user={user.userName} />} />
            <Route path="admin" element={<Admin />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="profile" element={<Profile  userInfo={user} setUser={setUser} setUserId={setUserId} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
