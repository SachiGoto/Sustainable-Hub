import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer";


function App() {
  const [allData, setAllData] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      const checkLogin = async () => {
      const response = await fetch("/login");
      const json = await response.json();
      setUser(json.user.userName);
      setUserId(json.user._id)

    
    };

    console.log(userId, user)

    const fetchAllData = async () => {
      const response = await fetch("/list");
      const json = await response.json();
      if (response.ok) setAllData(json);
    };
    checkLogin();
    fetchAllData();
  }, []);

  return (
 <>
    <div className="App">
    <div className='subApp'>
      <BrowserRouter>
        <Navbar className="h-[10vh]" user={user} setUser={setUser}/>
        <div className="pages h-[75vh]">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            {/* <Route path="main" element={<Main categoryData={allData} />} /> */}
            <Route path="main2" element={<Main2 user={user} userId={userId} />} />
            <Route path="admin" element={<Admin />} />
            <Route path="signup" element={<SignUp user={user} />} />
            <Route
              path="login"
              element={<LogIn user={user} setUser={setUser} userId={userId} setUserId={setUserId} />}
            />
            <Route
              path="profile"
              element={<Profile user={user} userId={userId} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>

    </div>

    </>
  );
}

export default App;
