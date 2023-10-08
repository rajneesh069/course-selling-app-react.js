import express, { json } from "express";
const app = express();
import adminRouter from "./routes/adminRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
app.use(json());
app.use(cors());

//Router for handling admin and user routes
app.use("/admin", adminRouter);
app.use("/users", userRouter);

//Listening on port 3000
app.listen(3000, () => {
    console.log("Server is up and running!");
})