import { connect, Schema, model } from "mongoose";
connect("mongodb://127.0.0.1:27017/courseSellingAppDB");
//Defining Schemas
const userSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: Schema.ObjectId, ref: "Course" }]
});

const adminSchema = new Schema({
    username: String,
    password: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    image: String,
    price: String,
    published: Boolean,
});

const User = new model("users", userSchema);
const Course = new model("Course", courseSchema);
const Admin = new model("admin", adminSchema);
export { User, Admin, Course };