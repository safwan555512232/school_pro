import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    id: String,
    name: String,
    capacity: Number
});


const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom;