import Button from '@mui/material/Button';
import { Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setimage] = useState("");
    return (<div>
        <Typography variant='h6' align='center' margin={"3px"}>Welcome. Add Your Course Below.</Typography>
        <Card variant="outlined">
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
                    setimage(value);
                }} />
                <Button style={{ marginBottom: "2px" }} variant='contained' onClick={async () => {
                    const response = await axios.post("http://localhost:3000/admin/courses", {
                        title, description, image, published: true
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    })
                    if (response) {
                        alert("Course addded successfully!");
                    }
                }}>Add Course</Button>
            </div>
        </Card>
    </div>
    )
}

export default AddCourse;