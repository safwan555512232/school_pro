import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    id: String,
    name: String,
    role: String
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
