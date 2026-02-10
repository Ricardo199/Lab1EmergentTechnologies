const jwt = require('jsonwebtoken');
const { adminMiddleware, authMiddleware }= require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const Student = require('../model/student');

router.get("/", (req, res) => {
    res.send("Welcome to the Student Portal API");
});

//Login route
router.post("/login", async (req, res) => {
    try {
        const { StudentNumber, Password } = req.body;
        const student = await Student.findOne({ StudentNumber });

        if (!student || !student.comparePassword(Password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                id: student._id, 
                StudentNumber: student.StudentNumber,
                Role: student.Role
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Logout route
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

//get all courses (protected)
router.get("/courses", authMiddleware, async (req, res) => {
    try {
        const courses = await Course.getAllCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create new course (protected)
router.post("/courses", authMiddleware, async (req, res) => {
    try {
        const course = await Course.createCourse(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

//update course by name (protected)
router.put("/courses/:name", authMiddleware, async (req, res) => {
    try {
        res.status(200).json(await Course.updateCourseByName(req.params.name, req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete course by name (protected)
router.delete("/courses/:name", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        res.status(200).json(await Course.deleteCourseByName(req.params.name));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all students (protected)
router.get("/students", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get student by student number (protected)
router.get("/students/:studentNumber", authMiddleware, async (req, res) => {
    try {
        res.status(200).json(await Student.findByStudentNumber(req.params.studentNumber));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get student by name (protected)
router.get("/students/:firstName/:lastName", authMiddleware, async (req, res) => {
    try {
        res.status(200).json(await Student.findByName(req.params.firstName, req.params.lastName));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create new student (protected)
router.post("/students", async (req, res) => {
    try {
        res.status(201).json(await Student.createStudent(req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//update student information (protected)
router.put("/students/:studentNumber", authMiddleware, async (req, res) => {
    try {
        res.status(200).json(await Student.updateStudentByStudentNumber(req.params.studentNumber, req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//export router
module.exports = router;
