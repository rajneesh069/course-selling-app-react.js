import { useEffect, useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "../store/selectors/course";
import { Loading } from "./Loading";
function Course() {
    const { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    useEffect(() => {
        async function test() {
            const response = await axios.get("http://localhost:3000/admin/courses/" + courseId, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (response) {
                setCourse({
                    isLoading: false,
                    course: response.data.course,
                });
            }
            else {
                console.log("No response received");
            }
        }
        test();
    }, [courseId, setCourse]);
    if (courseLoading) {
        return <div>
            <Loading />
        </div>
    } else {
        return (<div>
            <GrayTopper />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>

            </Grid>
        </div>)
    }

}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const image = useRecoilValue(courseImage);

    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={image} style={{ width: "100%" }}></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>Price</Typography>
                <Price />
            </div>
        </Card>
    </div>
}

function Price() {
    const price = useRecoilValue(coursePrice);
    return <Typography variant="subtitle1">
        <b>Rs {price}</b>
    </Typography>
}

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.image);
    const [price, setPrice] = useState(courseDetails.course.price);
    return (<div>
        <Card variant="outlined" style={{
            maxWidth: 600,
            marginTop: "25%",
            marginLeft: "5%"
        }}>
            <div style={{ padding: "10px" }}>
                <TextField autoComplete='off' autoFocus style={{ marginBottom: "5px" }} fullWidth label="Title" variant="outlined" type='text' name='title' value={title} onChange={(event) => {
                    const { value } = event.target;
                    setTitle(value);
                }} />
                <TextField autoComplete='off' style={{ marginBottom: "5px" }} fullWidth label="Description" variant="outlined" type='description' name='description' value={description} onChange={(event) => {
                    const { value } = event.target;
                    setDescription(value);
                }} />
                <TextField autoComplete='off' style={{ marginBottom: "5px" }} fullWidth label="Image Url" variant="outlined" type='url' name='image' value={image} onChange={(event) => {
                    const { value } = event.target;
                    setImage(value);
                }} />
                <TextField autoComplete='off' style={{ marginBottom: "5px" }} fullWidth label="Price" variant="outlined" type='text' name='price' value={price} onChange={(event) => {
                    const { value } = event.target;
                    setPrice(value);
                }} />
                <Button style={{ marginBottom: "2px" }} variant='contained' onClick={async () => {
                    const response = await axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id, {
                        title, description, image, price, published: true
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    });
                    if (response) {
                        setCourse({
                            isLoading: false,
                            course: response.data.course,
                        });
                    } else {
                        console.log("response not received")
                    }
                }}>Update Course</Button>
            </div>
        </Card>
    </div>
    )
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column", }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}


export default Course;