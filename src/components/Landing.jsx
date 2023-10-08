import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Landing() {
    const navigate = useNavigate();
    return (
        <div>
            <Box
                sx={{
                    display: "grid",
                    gridTemplate: "1fr/1fr 1fr 1fr"
                }}>
                <Box gridArea={"1/1/3/3"} marginTop={"20%"}
                    marginLeft={"20%"} marginRight={"20%"}>
                    <h3>Welcome to Coursera</h3>
                    <Button
                        style={{ marginRight: "2%", marginTop: "1%" }}
                        variant="contained" onClick={() => {
                            navigate("/signin");
                        }}>
                        SIGN IN</Button>
                    <Button
                        variant="contained" style={{ marginTop: "1%" }} onClick={() => {
                            navigate("/signup");
                        }}>
                        SIGN UP</Button>
                </Box>
                <div style={{
                    gridArea: "1/3/3/4",
                    marginTop: "20%",
                    marginRight: "20%",
                    padding: 0,
                    width: "80%",
                    height: "85%",
                }}
                >
                    <img height={"100%"} width={"100%"} src="https://assets.globalpartnership.org/s3fs-public/styles/standard_blog_banner/public/blog_post/image/48490478766_a3d1d385e6_k.jpg?VersionId=BeezhqmblE67FqMpJ62VjnBFF0P.uuaJ&itok=11VEjmxU" />
                </div>

            </Box>
        </div>)
}

export default Landing;