const express = require('express');
const router= express.Router();
const CollegeController= require("../controller/collegeController");
const InternController= require("../controller/internController");


router.post("/colleges", CollegeController.createCollege);

router.post("/interns", InternController.createInterns);

router.get("/collegeDetails", CollegeController.getColleges);



module.exports= router;
