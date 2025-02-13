import express from "express";
import { createTeacher, getTeachers, updateTeacher, deleteTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
