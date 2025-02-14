import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
const allowedOrigins = [
    "https://school-management-frontend-inky.vercel.app",
    "http://localhost:5173", // Add your local frontend URL for development
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Logging middleware for debugging
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log(`Origin: ${req.headers.origin}`);
    next();
});

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api/admin", authRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));