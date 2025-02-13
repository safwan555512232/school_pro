import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String
});

const Facility = mongoose.model("Facility", facilitySchema);
export default Facility;
