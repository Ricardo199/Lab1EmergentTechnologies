const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const Student = require('../model/student');

router.get("/", (req, res) => {
    res.send("Welcome to the Student Portal API");
});

//get all courses
router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.getAllCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create new course
router.post("/courses", async (req, res) => {
    try {
        const course = await Course.createCourse(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

//update course by name
router.put("/courses/:name", async (req, res) => {
    try {
        res.status(200).json(await Course.updateCourseByName(req.params.name, req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete course by name
router.delete("/courses/:name", async (req, res) => {
    try {
        res.status(200).json(await Course.deleteCourseByName(req.params.name));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get student by student number
router.get("/students/:studentNumber", async (req, res) => {
    try{
        res.status(200).json(await Student.findByStudentNumber(req.params.studentNumber));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get student by name
router.get("/students/:firstName/:lastName", async (req, res) => {
    try{
        res.status(200).json(await Student.findByName(req.params.firstName, req.params.lastName));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create new student
router.post("/students", async (req, res) => {
    try {
        res.status(201).json(await Student.createStudent(req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//update student information
router.put("/students/:studentNumber", async (req, res) => {
    try {
        res.status(200).json(await Student.updateStudentByStudentNumber(req.params.studentNumber, req.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all students
router.get("/students", async (req, res) => {
    try{
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;