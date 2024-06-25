import express from "express";
import {employerGetAllApplication, jobSeekerDeleteApplication, jobSeekerGetAllApplication, postApplication} from "../controllers/applicationController.js";
import {isAuthorised} from "../middlewares/auth.js"

const router = express.Router();

router.get("/employer/getAll", isAuthorised, employerGetAllApplication);
router.get("/jobSeeker/getAll", isAuthorised, jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplication);
router.post("/post", isAuthorised, postApplication);

export default router;