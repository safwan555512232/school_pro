import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    grade: String
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
