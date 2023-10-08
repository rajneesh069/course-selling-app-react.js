import express from "express";
import { Admin, Course } from "../db/mongoDB.js"
import { generateJwtAdmin, authenticateJwtAdmin } from "../middleware/jwtAuthentication.js"
const router = express.Router();
//Admin Routes
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username })
        if (admin) {
            res.status(404).send("Admin already exists");
        } else {
            const newAdmin = new Admin({
                username: username,
                password: password,
            });
            const token = generateJwtAdmin(req.body);
            res.status(201).json({ message: "Admin signed up successfully!", token, username });
            await newAdmin.save();
        }
    } catch (error) {
        console.error(error);
    }

});

router.post("/login", async (req, res) => {
    const { username } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        const token = generateJwtAdmin({ username });
        res.status(200).json({ message: "Admin logged in successfully", token, username })
    } else {
        res.status(403).json({ message: "Admin authentication failed" });
    }
});

router.post("/courses", authenticateJwtAdmin, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: "Course added successfully", courseId: course._id });

});

router.put("/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    res.status(200).json({ message: "Course updated successfully", courseId: course._id, course });
});

router.get("/me", authenticateJwtAdmin, (req, res) => {
    res.json({
        username: req.admin.username,
    })
})

router.get("/courses", authenticateJwtAdmin, async (req, res) => {
    res.status(200).json({ courses: await Course.find({}) });
});

router.get("/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findOne({ _id: courseId });
    res.status(200).json({ course: course });
})

export default router;