import express from "express";
import { createFacility, getFacilities, updateFacility, deleteFacility } from "../controllers/facilityController.js";

const router = express.Router();

router.post("/", createFacility);
router.get("/", getFacilities);
router.put("/:id", updateFacility);
router.delete("/:id", deleteFacility);

export default router;
