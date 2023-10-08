import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function test() {
            const response = await axios.get("http://localhost:3000/admin/courses/", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (response) {
                setCourses(response.data.courses);
            }
        }
        test();
    }, []);

    return <div style={{
        display: "flex",
        flex: "wrap",
    }}>
        {courses.map((course) => {
            return <CourseCard key={course._id} course={course} />
        })}
    </div>

}

export function CourseCard({ course }) {
    const navigate = useNavigate();
    return <Card style={{
        margin: "2%",
        width: "22%",
        height: "20%",
        border: "0.2px solid grey",
        backgroundColor: "#eeeeee",
        boxShadow: 3
    }}>
        <img src={course.image} style={{ width: "100%" }}></img>
        <Typography marginLeft={"2%"} variant="h6" fontWeight={700} textAlign={"left"}>{course.title}</Typography>
        <div style={{ marginLeft: "2%" }}><Typography variant="body" textAlign={"left"}>{course.description}</Typography></div>
        <Typography marginLeft={"2%"} textAlign={"left"} fontWeight={600} style={{ marginTop: "2%" }}>Rs.{course.price}</Typography>
        <Button style={{ marginLeft: "40%", marginBottom: "3%" }} variant="contained" onClick={() => {
            navigate("/courses/" + course._id);
        }}>EDIT</Button>
    </Card>

}

CourseCard.propTypes = {
    course: PropTypes.object,
}


export default Courses;