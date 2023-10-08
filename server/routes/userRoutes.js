import express from "express";
import { Course, User } from "../db/mongoDB.js"
import { generateJwtUser, authenticateJwtUser } from "../middleware/jwtAuthentication.js"
const router = express.Router();
//User Routes
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    } else {
        const token = generateJwtUser({ username, password });
        res.status(201).json({ message: "User created successfully!", token });
        const newUser = new User({ username, password });
        await newUser.save();
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
        const token = generateJwtUser({ username, password });
        res.status(200).json({ message: "User logged in successfully", token });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});


router.post("/courses/:courseId", authenticateJwtUser, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    const { username, password } = req.user;
    const user = await User.findOne({ username, password });
    if (user && course.published) {
        user.purchasedCourses.push(course);
        await user.save();
        res.status(200).json({ message: "Course purchased successfully", courseId: course._id });
    } else {
        res.sendStatus(404);
    }
})

router.get("/purchasedCourses", authenticateJwtUser, async (req, res) => {
    const { username, password } = req.user;
    const user = await User.findOne({ username, password }).populate("purchasedCourses");
    if (user) {
        res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: "No user found" });
    }
});

router.get("/courses", authenticateJwtUser, async (req, res) => {
    res.status(200).json({ courses: await Course.find({ published: true }) });
})

export default router;