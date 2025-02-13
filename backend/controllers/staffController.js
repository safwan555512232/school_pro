import Staff from "../models/Staff.js";

export const createStaff = async (req, res) => {
    try {
        const newStaff = await Staff.create(req.body);
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStaff);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteStaff = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ message: "Staff deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
