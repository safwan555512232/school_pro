import express from "express";
import { createClassroom, getClassrooms, updateClassroom, deleteClassroom } from "../controllers/classroomController.js";

const router = express.Router();
router.post("/", createClassroom);
router.get("/", getClassrooms);
router.put("/:id", updateClassroom);
router.delete("/:id", deleteClassroom);

export default router;
