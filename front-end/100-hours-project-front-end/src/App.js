import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect,  useState } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";


//import { useNavigate } from "react-router-dom";

function App() {
  const [allData, setAllData] = useState(null);
  const [user, setUser] = useState({ userName: null });
  const [userId, setUserId] = useState({userid:null})
  //const navigate = useNavigate();

  useEffect(() => {
    console.log('app.js use effect gets triggered')

    const fetchAllData = async () => {
      const response = await fetch("/list");
      const json = await response.json();

      if (response.ok) {
        setAllData(json);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user.userName} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home user={user.userName}/>} />
            <Route path="main" element={<Main categoryData={allData}  userId={userId.userId} user={user.userName} />} />
           
            <Route path="main2" element={<Main2 userId={userId.userId} user={user.userName} />} />
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
