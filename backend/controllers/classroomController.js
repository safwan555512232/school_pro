import Classroom from "../models/Classroom.js";

export const createClassroom = async (req, res) => {
    const newClassroom = await Classroom.create(req.body);
    res.status(201).json(newClassroom);
};

export const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.find();
    res.json(classrooms);
};

export const updateClassroom = async (req, res) => {
    const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClassroom);
};

export const deleteClassroom = async (req, res) => {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ message: "Classroom deleted" });
};
