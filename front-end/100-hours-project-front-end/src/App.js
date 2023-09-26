import { Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("/login")
      .then((response) => response.json())
      .then((json) => {
        setUser(json.user.userName);
        setUserId(json.user._id);
        console.log(userId, user);
      }, []);
  }, [user, userId]);

  return (
    <>
      <div className="App">
        <div className="subApp">
          <HashRouter>
            <Navbar className="h-[10vh]" user={user} setUser={setUser} />
            <div className="pages">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                  path="main"
                  element={<Main user={user} userId={userId} />}
                />
                <Route path="admin" element={<Admin />} />
                <Route path="signup" element={<SignUp user={user} />} />
                <Route
                  path="login"
                  element={
                    <LogIn
                      user={user}
                      setUser={setUser}
                      userId={userId}
                      setUserId={setUserId}
                    />
                  }
                />
                <Route
                  path="profile"
                  element={<Profile user={user} userId={userId} />}
                />
              </Routes>
            </div>
          </HashRouter>
        </div>
      </div>
    </>
  );
}

export default App;
