import Button from '@mui/material/Button';
import { Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
function Signup() {
    const setUser = useSetRecoilState(userState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (<div>
        <Typography variant='h6' align='center' margin={"3px"}>Welcome. Sign up Below.</Typography>
        <Card variant="outlined">
            <div style={{ padding: "10px" }}>
                <TextField autoComplete='off' autoFocus style={{ marginBottom: "5px" }} fullWidth label="Email" variant="outlined" type='email' name='username' value={username} onChange={(event) => {
                    const { value } = event.target;
                    setUsername(value);
                }} />
                <TextField autoComplete='off' style={{ marginBottom: "5px" }} fullWidth label="Password" variant="outlined" type='password' name='password' value={password} onChange={(event) => {
                    const { value } = event.target;
                    setPassword(value);
                }} />
                <Button style={{ marginBottom: "2px" }} variant='contained' onClick={async () => {
                    const response = await axios.post("http://localhost:3000/admin/signup", {
                        username, password
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response) {
                        setUser({
                            isLoading: false,
                            userEmail: response.data.username,
                        })
                        localStorage.setItem("token", response.data.token);
                        navigate("/addCourse");
                    }
                }}>SIGN UP</Button>
            </div>
        </Card>
    </div>
    )
}

export default Signup;