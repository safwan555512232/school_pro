import Teacher from "../models/Teacher.js";

export const createTeacher = async (req, res) => {
    try {
        const newTeacher = await Teacher.create(req.body);
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ message: "Teacher deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
