import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { Loading } from "./Loading";

function Appbar() {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const userLoading = useRecoilValue(isUserLoading);

    if (userLoading) {
        return <><Loading /></>
    }

    if (userEmail) {
        return (
            <div className="container-fluid d-flex pt-2 justify-content-between">
                <div className="h3">
                    <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>Coursera</Link>
                </div>
                <div>
                    <Button style={{ marginLeft: 5, marginRight: 5 }}
                        onClick={() => {
                            navigate("/addCourse");
                        }}>
                        Add Course</Button>

                    <Button style={{ marginLeft: 5, marginRight: 5 }}
                        onClick={() => {
                            navigate("/courses");
                        }}>
                        Courses</Button>

                    <Button style={{ marginLeft: 5, marginRight: 5 }}
                        variant="contained" onClick={() => {
                            setUser({
                                isLoading: false,
                                userEmail: null,
                            })
                            localStorage.removeItem("token");
                            navigate("/");
                        }}>
                        Logout</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid d-flex pt-2 justify-content-between">
            <div className="h3">
                Coursera
            </div>
            <div>
                <Button
                    style={{ marginRight: "3px" }}
                    variant="contained" onClick={() => {
                        navigate("/signin");
                    }}>
                    SIGN IN</Button>
                <Button
                    variant="contained" onClick={() => {
                        navigate("/signup");
                    }}>
                    SIGN UP</Button>
            </div>
        </div>)

}

export default Appbar;