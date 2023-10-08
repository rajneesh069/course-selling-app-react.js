import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import Landing from "./components/Landing";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import BASE_URL from "./config.js";
import { useEffect } from "react";
import { userState } from "./store/atoms/user";


function App() {
  return (<div>
    <RecoilRoot>
      <Router>
        <Appbar />
        <InitUser />
        <Routes>

          <Route path="/" element={<Landing />}>
          </Route>

          <Route path="/signup" element={<div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }} className="container d-flex align-items-center">
            <Signup />
          </div>}>
          </Route>

          <Route path="/addCourse" element={<div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }} className="container d-flex align-items-center">
            <AddCourse />
          </div>}>
          </Route>

          <Route path="/signin" element={<div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }} className="container d-flex align-items-center">
            <Signin />
          </div>}>
          </Route>

          <Route path="/courses" element={<Courses />}>
          </Route>

          <Route path={"/courses/:courseId"} element={<Course />}>
          </Route>

        </Routes>

      </Router>
    </RecoilRoot>
  </div>)

}

function InitUser() {
  const setUser = useSetRecoilState(userState);


  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/me`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        })
        if (response.data.username) {
          setUser({
            isLoading: false,
            userEmail: response.data.username,
          })
        } else {
          setUser({
            isLoading: false,
            userEmail: null,
          })
        }
      } catch (error) {
        setUser({
          isLoading: false,
          userEmail: null,
        })
      }
    }
    init();
  }, [setUser]);
  return <></>
}

export default App;