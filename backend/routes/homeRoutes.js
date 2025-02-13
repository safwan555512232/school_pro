import express from 'express';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Staff from '../models/Staff.js';
import Classroom from '../models/Classroom.js';
import Facility from '../models/Facility.js';

const router = express.Router();

// Route to get counts for homepage
router.get('/counts', async (req, res) => {
  try {
    const studentsCount = await Student.countDocuments();
    const teachersCount = await Teacher.countDocuments();
    const staffCount = await Staff.countDocuments();
    const classroomsCount = await Classroom.countDocuments();
    const facilitiesCount = await Facility.countDocuments();

    res.json({
      students: studentsCount,
      teachers: teachersCount,
      staff: staffCount,
      classrooms: classroomsCount,
      facilities: facilitiesCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Error fetching counts' });
  }
});

export default router;