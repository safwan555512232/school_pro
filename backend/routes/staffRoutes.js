import express from "express";
import { createStaff, getStaff, updateStaff, deleteStaff } from "../controllers/staffController.js";

const router = express.Router();

router.post("/", createStaff);
router.get("/", getStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
